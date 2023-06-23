//Created by Marycruz Yong Tencio

// Initialize the flip sound
const flipSound = new Audio("Magic Scroll 3.wav");

// Initialize the match sound
const matchSound = new Audio("MA_Stockboom_Angelic Game Event_Revealed.wav");

// Store the selected difficulty level
let selectedDifficulty = null;

// Store the number of players (default value is 1)
let selectedPlayers = 1; // Default value is 1 player

// Store the names of the players
let playerNames = [];


// Store the flipped cards
let flippedCards = [];

// Object to store the matched cards count for each player
let matchedCardsCount = {}; 

// Initialize the matched pairs count
let matchedPairs = 0;

// Define pairs variable globally
let pairs = 0; 

// Store the current turn of the player
let currentTurn = 1;


function playFlipSound() {
  flipSound.currentTime = 0; // Reset the audio to the beginning
  // Make the sound play
  flipSound.play();
}

function switchTurn() {

  // 1 ? 2 : 1 is a switch between player 1 and player 2, checks the value of 
  //currentTurn. If currentTurn is equal to 1, 
  //it assigns 2 to currentTurn. Otherwise, 
  //if currentTurn is not equal to 1, it assigns 1 to currentTurn. 
  //This effectively switches the turn between player 1 and player 2.
  currentTurn = currentTurn === 1 ? 2 : 1; 

  // Visually Highlight the current player's name
  highlightCurrentPlayer(); 
}

function playMatchSound() {
  matchSound.currentTime = 0; // Reset the audio to the beginning
  // Make the sound play
  matchSound.play();
}

//Display the introductory section of the game and hides the other sections if the user goes back
function intro() {
  document.getElementById("intro").style.display = "flex";
  hideDifficulty();
  hideSetPlayers();

}

//Hide the introductory section of the game and display difficulty
function hideIntro() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("setDifficulty").style.display = "grid";
  hideSetPlayers();
}


//is used to hide the difficulty section and display the player selection section in the game.
function hideDifficulty() {
  document.getElementById("setDifficulty").style.display = "none";
  document.getElementById("playerSelection").style.display = "grid";
  hideNamePlayers();
}

//Sets the difficulty level for the game and hides this section
function chooseDifficulty(difficulty) {
  selectedDifficulty = difficulty; //It stores the selected difficulty level for later use in the game.
  console.log(`Selected difficulty: ${selectedDifficulty}`);
  hideDifficulty();
}

//The setPlayers(players) function is used to set the number of players for the game. 
function setPlayers(players) {
  selectedPlayers = players;
  console.log(`Selected players: ${selectedPlayers}`);
  hideSetPlayers();
  showPlayerNameInputs();
  resetStartGameButton();
}

//just hide the players selection section
function hideSetPlayers() {
  document.getElementById("playerSelection").style.display = "none";
}

//Is responsible for displaying the name input fields for each player and updating the player number and matched cards count display.
function showPlayerNameInputs() {

  //This line sets the display the section
  document.getElementById("playerNames").style.display = "grid";

  //These lines store references to the elements with the IDs "playerInputs", "playerNumber", and "playerCardsMatched" respectively.
  const playerInputContainer = document.getElementById("playerInputs");
  const playerNumberContainer = document.getElementById("playerNumber");
  const playerCardsMatchedContainer = document.getElementById("playerCardsMatched"); // Added line

  //These lines clear the contents of the player input container,
  playerInputContainer.innerHTML = "";
  playerNumberContainer.innerHTML = "";
  playerCardsMatchedContainer.innerHTML = ""; 

  //This loop runs selectedPlayers times to create and append(add) the necessary elements for each player.
  for (let i = 1; i <= selectedPlayers; i++) {
    const playerNameInput = document.createElement("input");
    const playerNumber = document.createElement("div");
    const playerCardsMatched = document.createElement("div"); // Added line

    playerNameInput.type = "text";
    playerNameInput.placeholder = `Name Player #${i}`;
    playerNumber.textContent = `${i}`;
    playerCardsMatched.textContent = "Matched: 0"; // Added line

    playerNameInput.addEventListener("input", checkStartGameButton);
    playerInputContainer.appendChild(playerNameInput);
    playerNumberContainer.appendChild(playerNumber);
    playerCardsMatchedContainer.appendChild(playerCardsMatched); // Added line
  }

  //checks if the button should be disabled or enabled
  checkStartGameButton();

  // Distribute player names horizontally across the width of the screen
  const playerNamesContainer = document.getElementById("playerNamesContainer");
  playerNamesContainer.style.display = "flex";
  playerNamesContainer.style.justifyContent = "space-between";
  playerNamesContainer.style.width = "100%";

  playerCardsMatched.style.display = "flex";
  playerCardsMatched.style.justifyContent = "space-between";
  playerCardsMatched.style.width = "100%";

  //add specific properties for the text if there are more than 4 players
  if (selectedPlayers === 4 || selectedPlayers === 5) {
    playerNamesContainer.style.fontSize = "10px";
    playerCardsMatchedContainer.style.fontSize = "10px";
  }
}

// function is responsible for dynamically creating the memory card 
//grid based on the selected difficulty level
function createGrid() {

  //add an variable for the cardSize depending on the difficulty and breakpoint
  let cardSize;

  //This switch statement assigns the number of pairs and the card size based on the selected difficulty. 
  switch (selectedDifficulty) {
    case "easy":
      pairs = 15;
      //cardSize = "100px";
    break;
    case "medium":
      pairs = 20;
      //cardSize = "80px";
    break;
    case "hard":
      pairs = 25;
      //cardSize = "70px";
    break;
    case "extreme":
      pairs = 30;
      //cardSize = "60px";
    break;
  }
  
  //These lines reset the matchedPairs count to 0 and clear the content of the grid container
  matchedPairs = 0;

  //The grid container is the element with the ID "gridContainer" where the memory cards will be appended.
  const gridContainer = document.getElementById("gridContainer");
  gridContainer.innerHTML = "";

  //This code checks if the window width is less than or equal to 600 pixels and if the selected difficulty is either "hard" or "extreme". 
  const isBreakpointReached = window.innerWidth <= 600 && (selectedDifficulty === "hard" || selectedDifficulty === "extreme");
  // Update card size if breakpoint is reached
  if (isBreakpointReached) {
    cardSize = "40px";
  }

    

  // Set the size of the grid container based on the number of pairs
  //gridContainer.style.width = `${Math.ceil(Math.sqrt(pairs * 2)) * parseFloat(cardSize)}px`;

  //This array holds the URLs of the images to be used for the card faces.
  const images = [
    "Cards Images/1.png", 
    "Cards Images/2.png",
    "Cards Images/3.png",
    "Cards Images/4.png",
    "Cards Images/5.png",
    "Cards Images/6.png",
    "Cards Images/7.png",
    "Cards Images/8.png",
    "Cards Images/9.png",
    "Cards Images/10.png",
    "Cards Images/11.png",
    "Cards Images/12.png",
    "Cards Images/13.png",
    "Cards Images/14.png",
    "Cards Images/15.png",
    "Cards Images/16.png",
    "Cards Images/17.png",
    "Cards Images/18.png",
    "Cards Images/19.png",
    "Cards Images/20.png",
    "Cards Images/21.png",
    "Cards Images/22.png",
    "Cards Images/23.png",
    "Cards Images/24.png",
    "Cards Images/25.png",
    "Cards Images/26.png",
    "Cards Images/27.png",
    "Cards Images/28.png",
    "Cards Images/29.png",
    "Cards Images/30.png",
    "Cards Images/31.png",
    "Cards Images/32.png",
    "Cards Images/33.png",
    "Cards Images/34.png",
    "Cards Images/35.png",
  ];

    
  //This loop creates an array called cardIndices that contains pairs of numbers.
  // Each number is duplicated to represent a pair of cards.
  const cardIndices = [];
  for (let i = 0; i < pairs; i++) {
    cardIndices.push(i);
    cardIndices.push(i);
  }
  
  // Shuffle the card indices.
  for (let i = cardIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardIndices[i], cardIndices[j]] = [cardIndices[j], cardIndices[i]];
  }
  
  //This portion of the code creates the individual memory cards and appends them to the grid container.
  //This loop iterates over the number of pairs multiplied by 2 to create each card. 
  for (let i = 0; i < pairs * 2; i++) {
    const card = document.createElement("div");
    //For each iteration, a new div element is created and assigned the class "card". 
    card.classList.add("card");
    //The cardIndex dataset attribute is set to the corresponding value from the shuffled cardIndices array.
    card.dataset.cardIndex = cardIndices[i];
    //The flipped dataset attribute is set to "false"
    card.dataset.flipped = false;
    //An event listener is added to listen for clicks on the card, which will trigger the flipCard
    card.addEventListener("click", flipCard);
  
    //These lines create the front and back faces of the card.
    const frontFace = document.createElement("div");
    frontFace.classList.add("card-front");
  
    const backFace = document.createElement("div");
    backFace.classList.add("card-back");
      
    //Here, two img elements are created to hold the images for the front and back faces of the card.
    const imageFront = document.createElement("img");
    //The src attribute of imageFront is set to the URL of the corresponding image from the images array based on the cardIndex.
    imageFront.src = images[cardIndices[i]]; // Use the corresponding image for the card index
    //The style properties are set to ensure the images fill the entire space of the card face.
    imageFront.style.width = "100%";
    imageFront.style.height = "100%";
    imageFront.style.objectFit = "cover";


    const imageBack = document.createElement("img");
    //instead the back imahe is just a defined src, just one image
    imageBack.src = "/cardBack.png"; 
    imageBack.style.width = "100%";
    imageBack.style.height = "100%";
    imageBack.style.objectFit = "cover";
    


    //These lines append the front and back faces to their respective parent elements. The imageFront is appended to frontFace, and imageBack is appended to backFace. 
    frontFace.appendChild(imageFront);
    backFace.appendChild(imageBack);

    //Then, both frontFace and backFace are appended to the card element.
    card.appendChild(frontFace);
    card.appendChild(backFace);

    // Set the size of the card
    card.style.width = cardSize;
    card.style.height = cardSize;
    
    //card element is appended to the gridContainer, which represents the memory card grid on the webpage.
    gridContainer.appendChild(card);
  }
}
  
//function retrieves the names entered by the players in the input fields and stores them in the playerNames array
function getPlayerNames() {
  playerNames = [];
  //The function selects the input fields for player names using querySelectorAll
  const playerNameInputs = document.querySelectorAll("#playerInputs input");

  //The playerNumberContainer and playerNamesContainer elements are also selected using getElementById
  const playerNumberContainer = document.getElementById("playerNumberContainer");
  const playerNamesContainer = document.getElementById("playerNamesContainer");

  //Next, the inner HTML of playerNumberContainer and playerNamesContainer is cleared.
  playerNumberContainer.innerHTML = "";
  playerNamesContainer.innerHTML = "";

  // a loop iterates over each player name input using the forEach method. 
  playerNameInputs.forEach((input, index) => {

    //the player number is calculated as index + 1,
    const playerNumber = index + 1;
    //and the player name is retrieved from the input's value property.
    const playerName = input.value;

    //The player number and name are then added to the playerNames array as an object.
    playerNames.push({ number: playerNumber, name: playerName });

    //A div element called playerInfo is created to display the player's information, including the player number and name. 
    const playerInfo = document.createElement("div");
    playerInfo.textContent = `Player ${playerNumber}: ${playerName}`;
    
    //playerInfo is appended to the playerNamesContainer.
    playerNamesContainer.appendChild(playerInfo);
  });

  console.log("Player names:", playerNames);
}

//function is responsible for hiding the player name inputs section.
//respoonsible of resetting the restart button
function hideNamePlayers() {
  document.getElementById("playerNames").style.display = "none";
  resetStartGameButton();
}

// is responsible for resetting the state and appearance of the start game button.
function resetStartGameButton() {
  const startGameButton = document.getElementById("startGame");
  //The disabled property of the start game button is set to true, which disables the button. 
  //This prevents users from interacting with the button until it is re-enabled.
  startGameButton.disabled = true;

  //adds the CSS class "disabled-button"
  startGameButton.classList.add("disabled-button");
}

//responsible for checking the state of the player name inputs and updating the start game button
function checkStartGameButton() {

  //function begins by selecting all the player name inputs
  const playerNameInputs = document.querySelectorAll("#playerInputs input");

  //function selects the start game button
  const startGameButton = document.getElementById("startGame");

  //This variable will be used to keep track of whether all the player name inputs are filled.
  let allInputsFilled = true;
  

  //The function then iterates over each player name input using forEach 
  playerNameInputs.forEach((input) => {
    if (input.value.trim() === "") {
      allInputsFilled = false;
    }
  });
  
  //After checking all the inputs, the function evaluates the value of allInputsFilled
  if (allInputsFilled) {

    //If it is true, it means all inputs are filled, and the start game button is enabled 
    //by setting its disabled property to false. 
    startGameButton.disabled = false;
    //methods to update the button's appearance.
    startGameButton.classList.remove("disabled-button");
    startGameButton.classList.add("enabled-button");

  } else {
    startGameButton.disabled = true;
    startGameButton.classList.remove("enabled-button");
    startGameButton.classList.add("disabled-button");
  }
}

//Responsible for handling the flipping of cards when they are clicked
function flipCard() {

  //function is called to play a sound effect indicating that a card is being flipped.
  playFlipSound();

  // Disable clicking on cards during animation.
  //It checks if the clicked card already has the "flipped" class. If it does, it means the card is currently being animated 
  //or already flipped, so the function returns and does nothing.
  if (this.classList.contains("flipped")) return;

  //Check if there are less than 2 cards flipped.
  if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
    this.classList.toggle("flipped");
    this.dataset.flipped = this.classList.contains("flipped") ? "true" : "false";

    // Toggle the 'hidden' class on the front and back faces, the "hidden" class is used
    // to hide and show the front and back faces of the card when it is flipped or unflipped.
    const frontFace = this.querySelector(".card-front");
    const backFace = this.querySelector(".card-back");
    frontFace.classList.toggle("hidden");
    backFace.classList.toggle("hidden");

  
    // Add the card to the flipped cards array
    flippedCards.push(this);


    // Check if two cards are flipped
    if (flippedCards.length === 2) {
      const frontFace1 = flippedCards[0].querySelector(".card-front");
      const frontFace2 = flippedCards[1].querySelector(".card-front");

      // Compare the card indices
      if (frontFace1.parentNode.dataset.cardIndex === frontFace2.parentNode.dataset.cardIndex) {

        // Add Matched class 
        flippedCards.forEach((card) => card.classList.add("matched"));
        flippedCards = []; // Reset flipped cards array

        playMatchSound(); // Play match sound

        // Increment the matched cards count for the current player
        matchedCardsCount[currentPlayer] += 1;

        // Update the matched cards count display for the current player
        const playerCardsMatched = document.querySelector(`#playerCardsMatched div:nth-child(${currentPlayer})`);
        playerCardsMatched.textContent = `Matched: ${matchedCardsCount[currentPlayer]}`;
        
        // Check if all cards are matched
        const allMatched = document.querySelectorAll(".card.matched");

        if (allMatched.length === pairs * 2) {
          console.log("Game Over!");
          endGame(); // Call the function to handle the end of the game
        }

      } else {
        // Not a match, flip the cards back after a delay
        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.classList.remove("flipped");
            card.dataset.flipped = "false";
            const frontFace = card.querySelector(".card-front");
            const backFace = card.querySelector(".card-back");
            frontFace.classList.remove("hidden");
            backFace.classList.remove("hidden");
          });

          flippedCards = []; // Reset flipped cards array
          switchTurn(); // Switch turns after flipping the cards back, the turn in switch
          //until the cards are not match if they match the player keeps the turn
        }, 1300); // Adjust the delay value
      }
    }
  }
}

//is responsible for switching the turn between players in the game.
function switchTurn() {
  //increments the currentPlayer variable by 1, moving to the next player.
  currentPlayer++;
  
  //The if statement checks if the currentPlayer exceeds the total number of selected players
  if (currentPlayer > selectedPlayers) {

    //If it does, it means all players have taken their turn, 
    //so the currentPlayer is reset to 1
    currentPlayer = 1;
  }

  //is called to update the visual indication of the current player,
  highlightCurrentPlayer();
}

//is responsible for highlighting the name of the current player in the player names container.
function highlightCurrentPlayer() {
  //It starts by selecting the playerNamesContainer element (that contains the player names.)
  const playerInfoContainer = document.getElementById("playerNamesContainer");

  //Next, it selects all the div elements within the playerNamesContainer
  const playerInfos = playerInfoContainer.querySelectorAll("div");

  // Remove the highlight from all player names
  playerInfos.forEach((playerInfo) => {
    playerInfo.classList.remove("current-player");
  });

  // Add the highlight to the current player's name
  //It adds the "current-player" class to the name of the current player.
  const currentPlayerInfo = playerInfoContainer.querySelector(`div:nth-child(${currentPlayer})`);
  currentPlayerInfo.classList.add("current-player");

}

//function is called when the game is started
function startGame() {

  //It displays the game grid 
  document.getElementById("started").style.display = "grid";

  //hides the player names section
  hideNamePlayers();
  console.log(`Starting game with difficulty: ${selectedDifficulty} and ${selectedPlayers} player(s).`);
  
  //creates the game grid
  createGrid();

  //retrieves the player names
  getPlayerNames();

  currentPlayer = 1; // Set the current player to 1 (for the turns)

  //highlights the current player's name
  highlightCurrentPlayer(); // Highlight the current player's name

  // Initialize the counters for each player
  matchedCardsCount = {}; // Reset the matchedCardsCount object
  for (let i = 1; i <= selectedPlayers; i++) {
    matchedCardsCount[i] = 0; // Set initial count to 0 for each player
  }
}

//function is called to restart the game
function restartGame() {
  flippedCards = []; //array to an empty array.
  matchedCardsCount = {}; //object to an empty object.
  currentPlayer = 1; //variable back to 1.
  matchedPairs = 0; //variables to 0.
  pairs = 0;

  //clears the card grid by setting the innerHTML of the element with the id "gridContainer" to an empty string.
  document.getElementById("gridContainer").innerHTML = ""; // Clear the card grid
  createGrid(); // Generate new cards

  // Reset the matched cards count for each player to 0
  for (let i = 1; i <= selectedPlayers; i++) {
    matchedCardsCount[i] = 0;
    const playerCardsMatched = document.querySelector(`#playerCardsMatched div:nth-child(${i})`);
    playerCardsMatched.textContent = `Matched: ${matchedCardsCount[i]}`;
  }

  highlightCurrentPlayer(); // Highlight the new current player's name
}

//function is used to determine the winner of the game based on the number of matched cards for each player. 
function findWinner(players) {

  //takes an array of players as a parameter
  //where each player object contains information about the player's name and the number of matched cards.
  let winner = players[0];
  
  for (let i = 1; i < players.length; i++) {
    if (players[i].matchedCards > winner.matchedCards) {
      winner = players[i];
    }
  }
  console.log(winner);
  return winner;
}


//function is called when the game is over
function endGame() {
  hideGame();//Hides the game grid

  document.getElementById("endGame").style.display = "flex";//Displays the end game message

  //Creates an empty array players to store player objects.
  const players = [];

  //Iterates over the players and creates player objects with their name and the number of matched cards.
  for (let i = 1; i <= selectedPlayers; i++) {
    players.push({
      name: playerNames[i - 1].name,
      matchedCards: matchedCardsCount[i]
    });
  }

  // Sort the players array based on the number of matched cards in descending order
  players.sort((a, b) => b.matchedCards - a.matchedCards);

  //Retrieves the player with the highest number of matched cards 
  const winner = players[0];
  console.log("Winner:", winner);

  //Updates the content of the "winnerName" element to display the name of the winner and the number of matched cards.
  const winnerContainer = document.getElementById("winnerName");
  winnerContainer.textContent = `The winner is: ${winner.name} with ${winner.matchedCards} matched cards`;
}

//is used to exit the game and start a new game from scratch.
function exitGame() {
  console.log("Exiting game...");
  window.location.reload(); // Reload the page to start a new game from scratch
}


//funtion that hides the grid with cards and everything in the game
function hideGame() {
  document.getElementById("started").style.display = "none";
}





  


