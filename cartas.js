// app.js

let selectedCards = [];

// Select each card image and add an event listener only to the image
document.querySelectorAll(".pokemon-card img").forEach((img) => {
  img.addEventListener("click", (event) => {
    const card = event.target.closest(".pokemon-card");
    const name = card.getAttribute("data-name");
    const image = card.getAttribute("data-image");

    selectedCards.push({ name, image });
    displaySelectedCards();
  });
});

// Función para mostrar las cartas seleccionadas
// Function to display selected cards with an "X" button to remove them
function displaySelectedCards() {
  const container = document.getElementById("selectedCardsContainer");
  container.innerHTML = ""; // Clear previous content

  selectedCards.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add(
      "selected-card",
      "bg-white",
      "p-2",
      "rounded-lg",
      "shadow-md",
      "flex",
      "flex-col",
      "items-center",
      "relative"
    );

    const imgElem = document.createElement("img");
    imgElem.src = card.image;
    imgElem.alt = card.name;
    imgElem.classList.add("w-24", "h-24", "object-cover", "rounded");

    const nameElem = document.createElement("p");
    nameElem.textContent = card.name;
    nameElem.classList.add("text-sm", "font-semibold", "mt-2");

    // Create the "X" button for removing the card
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "&#10005;"; // HTML entity for "X"
    removeButton.classList.add(
      "absolute",
      "top-1",
      "right-1",
      "text-red-500",
      "hover:text-red-700",
      "text-lg",
      "font-bold",
      "focus:outline-none"
    );

    // Remove card from selectedCards when "X" is clicked
    removeButton.addEventListener("click", () => {
      selectedCards.splice(index, 1); // Remove the card from the array
      displaySelectedCards(); // Re-render the selected cards
    });

    // Append elements to the card container
    cardDiv.appendChild(imgElem);
    cardDiv.appendChild(nameElem);
    cardDiv.appendChild(removeButton);
    container.appendChild(cardDiv);
  });
}

// Guardar cartas seleccionadas como archivo .poketto
document.getElementById("savePoketto").addEventListener("click", () => {
  const fileName =
    document.getElementById("fileName").value || "cartas_seleccionadas";
  const pokettoData = JSON.stringify(selectedCards);
  const blob = new Blob([pokettoData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.poketto`;
  a.click();
});

// Cargar cartas desde archivo .poketto
document.getElementById("loadPoketto").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      selectedCards = JSON.parse(e.target.result);
      displaySelectedCards();
    };
    reader.readAsText(file);
  }
});

// Barra de búsqueda para filtrar cartas
document.getElementById("searchBar").addEventListener("input", (event) => {
  const searchQuery = event.target.value.toLowerCase();
  document.querySelectorAll(".pokemon-card").forEach((card) => {
    const name = card.getAttribute("data-name").toLowerCase();
    if (name.includes(searchQuery)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Referencia al dropdown de Common Decks
document.getElementById("commonDecks").addEventListener("change", (event) => {
  const selectedDeck = event.target.value;

  // Limpia las cartas seleccionadas
  selectedCards = [];

  // Dependiendo de la opción seleccionada, agregar cartas al array
  if (selectedDeck === "grass") {
    selectedCards.push(
      {
        name: "Pikachu",
        image: "https://www.serebii.net/tcgpocket/geneticapex/1.jpg",
      },
      {
        name: "Pikachu",
        image: "https://www.serebii.net/tcgpocket/geneticapex/1.jpg",
      },
      { name: "Bulbasaur", image: "https://example.com/bulbasaur.jpg" },
      { name: "Bulbasaur", image: "https://example.com/bulbasaur.jpg" }
    );
  }

  // Renderizar las cartas seleccionadas
  displaySelectedCards();
});
