let selectedDifficulty = null;
let selectedPlayers = 1; // Default value is 1 player
let playerNames = [];
let flippedCards = [];

let matchedPairs = 0;
let pairs = 0; // Define pairs variable globally


const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
  });


function intro() {

    document.getElementById("intro").style.display = "flex";
    hideDifficulty();
    hideSetPlayers()

}



function hideIntro() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("setDifficulty").style.display = "grid";
    hideSetPlayers()

}



function chooseDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    hideDifficulty();
    console.log(`Selected difficulty: ${selectedDifficulty}`);
}

function hideDifficulty() {
    document.getElementById("setDifficulty").style.display = "none";
    document.getElementById("playerSelection").style.display = "grid";
    hideNamePlayers()
    

}

function setPlayers(players) {
    selectedPlayers = players;
    console.log(`Selected players: ${selectedPlayers}`);
    hideSetPlayers()
    showPlayerNameInputs()

}

function hideSetPlayers() {
    document.getElementById("playerSelection").style.display = "none";
    
}

function showPlayerNameInputs() {
    document.getElementById("playerNames").style.display = "grid";

    const playerInputContainer = document.getElementById("playerInputs");
    const playerNumberContainer = document.getElementById("playerNumber");
    
    playerInputContainer.innerHTML = "";
    playerNumberContainer.innerHTML = "";

    for (let i = 1; i <= selectedPlayers; i++) {
        const playerNameInput = document.createElement("input");
        const playerNumber = document.createElement("div");
        
        playerNameInput.type = "text";
        playerNameInput.placeholder = `Name Player #${i}`;
        playerNumber.textContent = `${i}`;
        
        playerNameInput.addEventListener("input", checkStartGameButton);
        playerInputContainer.appendChild(playerNameInput);
        playerNumberContainer.appendChild(playerNumber);
    }
}

function createGrid() {
    let pairs = 0;
  
    switch (selectedDifficulty) {
      case "easy":
        pairs = 15;
        break;
      case "medium":
        pairs = 20;
        break;
      case "hard":
        pairs = 25;
        break;
      case "extreme":
        pairs = 30;
        break;
      default:
        pairs = 35;
        break;
  }
  
    matchedPairs = 0;
  
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";
  
    const images = [
      "/1.png", 
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/6.png",
      "/7.png",
      "/8.png",
      "/9.png",
      "/10.png",
      "/11.png",
      "/12.png",
      "/13.png",
      "/14.png",
      "/15.png",
      "/16.png"
    ];
  
    const cardIndices = [];
    for (let i = 0; i < pairs; i++) {
      cardIndices.push(i);
      cardIndices.push(i);
    }
  
    // Shuffle the card indices
    for (let i = cardIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardIndices[i], cardIndices[j]] = [cardIndices[j], cardIndices[i]];
    }
  
    for (let i = 0; i < pairs * 2; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.cardIndex = cardIndices[i];
      card.dataset.flipped = false;
      card.addEventListener("click", flipCard);
  
      const frontFace = document.createElement("div");
      frontFace.classList.add("card-front");
  
      const backFace = document.createElement("div");
      backFace.classList.add("card-back");

      const imageFront = document.createElement("img");
      imageFront.src = images[cardIndices[i]]; // Use the corresponding image for the card index
      imageFront.style.width = "100%";
      imageFront.style.height = "100%";
      imageFront.style.objectFit = "cover";

      const imageBack = document.createElement("img");
      imageBack.src = "/cardBack.png"; 
      imageBack.style.width = "100%";
      imageBack.style.height = "100%";
      imageBack.style.objectFit = "cover";

      frontFace.appendChild(imageFront);
      backFace.appendChild(imageBack);

      card.appendChild(frontFace);
      card.appendChild(backFace);

      gridContainer.appendChild(card);
      
      
  
      
    }
}
  
  



function getPlayerNames() {
    playerNames = [];
    const playerNameInputs = document.querySelectorAll("#playerInputs input");
    const playerNumberContainer = document.getElementById("playerNumberContainer");
    const playerNamesContainer = document.getElementById("playerNamesContainer");
    document.body.style.backgroundColor = "white";

    
    playerNumberContainer.innerHTML = "";
    playerNamesContainer.innerHTML = "";
  
    playerNameInputs.forEach((input, index) => {
      const playerNumber = index + 1;
      const playerName = input.value;
      playerNames.push({ number: playerNumber, name: playerName });
  
      const playerInfo = document.createElement("div");
      playerInfo.textContent = `Player ${playerNumber}: ${playerName}`;
      playerNamesContainer.appendChild(playerInfo);
    });
  
    console.log("Player names:", playerNames);
}


  



function hideNamePlayers() {
    document.getElementById("playerNames").style.display = "none";
    resetStartGameButton();
}

function resetStartGameButton() {
    const startGameButton = document.getElementById("startGame");
    startGameButton.disabled = true;
    startGameButton.classList.add("disabled-button");
}


function checkStartGameButton() {
    const playerNameInputs = document.querySelectorAll("#playerInputs input");
    const startGameButton = document.getElementById("startGame");
    let allInputsFilled = true;
  
    playerNameInputs.forEach((input) => {
      if (input.value.trim() === "") {
        allInputsFilled = false;
      }
    });
  
    if (allInputsFilled) {
      startGameButton.disabled = false;
      startGameButton.classList.remove("disabled-button");
      startGameButton.classList.add("enabled-button");
    } else {
      startGameButton.disabled = true;
      startGameButton.classList.remove("enabled-button");
      startGameButton.classList.add("disabled-button");
    }
}


function flipCard() {
    if (this.dataset.flipped === "true") {
      // Card is already flipped, do nothing
      return;
    }
  
    const backFace = this.querySelector(".card-back");
  
    // Toggle the 'flipped' class on the card
    this.classList.toggle("flipped");
  
    // Toggle the 'hidden' class on the back face
    backFace.classList.toggle("hidden");
  
    this.dataset.flipped = this.dataset.flipped === "true" ? "false" : "true";
}

function handleCardClick() {
    // Ignore clicks on matched or already flipped cards
    if (this.classList.contains('matched') || this.classList.contains('flipped')) {
      return;
    }
    
    // Flip the clicked card
    this.classList.add('flipped');
    flippedCards.push(this);
    
    // Check if two cards are flipped
    if (flippedCards.length === 2) {
      const card1 = flippedCards[0];
      const card2 = flippedCards[1];
      
      // Get the front faces of the flipped cards
      const frontFace1 = card1.querySelector('.card-front');
      const frontFace2 = card2.querySelector('.card-front');
      
      // Compare the card indices
      if (card1.dataset.cardIndex === card2.dataset.cardIndex) {
        // Matched pair
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        // Check if all pairs have been matched
        if (matchedPairs === pairs) {
          // All pairs have been matched, implement your logic here
          console.log('Game Over!');
        }
      } else {
        // Not a match, flip the cards back after a delay
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          frontFace1.classList.remove('hidden');
          frontFace2.classList.remove('hidden');
        }, 1000);
      }
      
      // Reset flipped cards array
      flippedCards = [];
    }
  }
  
  
  
  
  
  
function startGame() {

    document.getElementById("started").style.display = "grid";

    hideNamePlayers();
    console.log(`Starting game with difficulty: ${selectedDifficulty} and ${selectedPlayers} player(s).`);
    createGrid();
    getPlayerNames();
   
    


    
    // Add your logic for starting the game with the selected difficulty, number of players, and player names here
}


document.getElementById("startGame").addEventListener("click", function() {
    startGame();
});
  
document.getElementById("easy").addEventListener("click", function() {
    chooseDifficulty("easy");
});

document.getElementById("medium").addEventListener("click", function() {
    chooseDifficulty("medium");
});

document.getElementById("hard").addEventListener("click", function() {
    chooseDifficulty("hard");
});

document.getElementById("extreme").addEventListener("click", function() {
    chooseDifficulty("extreme");
});

document.getElementById("1Player").addEventListener("click", function() {
    setPlayers(1);
});

document.getElementById("2Player").addEventListener("click", function() {
    setPlayers(2);
});

document.getElementById("3Player").addEventListener("click", function() {
    setPlayers(3);
});

document.getElementById("4Player").addEventListener("click", function() {
    setPlayers(4);
});

document.getElementById("5Player").addEventListener("click", function() {
    setPlayers(5);
});
