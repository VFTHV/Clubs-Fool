const gameData = {
  players: ["player1", "player2", "player3"],
  winner: [false, false, false],
  turn: 0,
  deck: [
    /* {suit: "type of suit", value: Number, image: link} */
  ],
  player1: [
    /* {suit: "type of suit", value: Number, image: link, player: "player1"} */
  ],
  player2: [
    /* {suit: "type of suit", value: Number, image: link, player: "player1"} */
  ],
  player3: [
    /* {suit: "type of suit", value: Number, image: link, player: "player1"} */
  ],
  table: [],
};

// let numOfPlayers = gameData.players.length;

const numOfPlayers = () => {
  let counter = 0;

  const counterFunction = () => {
    gameData.winner.forEach((eachWinner) => {
      if (!eachWinner) {
        counter++;
      }
    });
    return counter;
  };
  return counterFunction();
};

const cardOrder = [6, 7, 8, 9, 10, 11, 12, 13, 14];
// const cardOrder = [6, 7, 8, 9];
/*
    const SUITS = Object.freeze({
        HEARTS: 'hearts',
    })

    let cardSuits = Object.vales(SUITS);
*/
// const cardSuits = ['hearts', 'spades', 'diamonds', 'clubs'];

const cardSuits = Object.freeze({
  hearts: "hearts",
  spades: "spades",
  diamonds: "diamonds",
  clubs: "clubs",
});

// const deck = [];
let comments = document.getElementById("comments");
let takeCard = document.getElementById("take-card");

function createDeck() {
  Object.keys(cardSuits).forEach(function (eachSuit) {
    for (let i = 0; i < cardOrder.length; i++) {
      // because gameData.deck  is an array use push() method to pusth cards
      // gameData.deck[i + (index * cardOrder.length)] = {
      //     // id: i + (index * cardOrder.length)
      //     suit: eachSuit,
      //     value: cardOrder[i],
      //     image: `images/${cardOrder[i]}-${eachSuit}.png`
      // }
      gameData.deck.push({
        suit: eachSuit,
        value: cardOrder[i],
        image: `images/${cardOrder[i]}-${eachSuit}.png`,
      });
    }
  });
}

function dealCards() {
  let cardCounter = 0;
  let playerCounter = 0;

  for (let i = 0; i < cardOrder.length * Object.keys(cardSuits).length; i++) {
    playerCounter %= gameData.players.length;
    const randomCard = Math.floor(Math.random() * gameData.deck.length);

    gameData[`player${playerCounter + 1}`].push(gameData.deck[randomCard]);
    // gameData[gameData.players[playerCounter]].push(gameData.deck[randomCard]);
    gameData[`player${playerCounter + 1}`][
      gameData[`player${playerCounter + 1}`].length - 1
    ].player = `player${playerCounter + 1}`;
    // gameData[gameData.players[playerCounter]][gameData[gameData.players[playerCounter]].length - 1].player = gameData.players[playerCounter];
    gameData.deck.splice(randomCard, 1);
    playerCounter++;
  }
}

function updatePlayer(player) {
  let sortedBySuit = [];
  let sortedDeck = [];
  // sort all cards by suits and values
  for (let i = 0; i < Object.keys(cardSuits).length; i++) {
    gameData[player].forEach(function (eachCard, index) {
      if (eachCard.suit === Object.keys(cardSuits)[i]) {
        sortedBySuit.push(gameData[player][index]);
      }
    });

    sortedBySuit.sort(function (a, b) {
      return a.value - b.value;
    });
    sortedDeck = sortedDeck.concat(sortedBySuit);
    sortedBySuit = [];
  }
  gameData[player] = sortedDeck;
  document.getElementById(player).innerHTML = "";

  if (player === gameData.players[gameData.turn]) {
    gameData[player].forEach(function (eachCard) {
      document.getElementById(
        player
      ).innerHTML += `<li><img src=${eachCard.image}></li>`;
    });
  } else {
    gameData[player].forEach(function (eachCard) {
      document.getElementById(
        player
      ).innerHTML += `<li><img src='images/back.png'></li>`;
    });
  }
}

function updateTableAndTurn() {
  // clear table
  gameData.players.forEach(function (eachPlayer) {
    document.getElementById(`${eachPlayer}Card`).innerHTML = "";
  });

  clearCTA();

  // update table
  gameData.table.forEach(function (eachCard, cardIndex) {
    const tableCard = document.getElementById(`${eachCard.player}Card`);
    tableCard.innerHTML += `<li><img src="${eachCard.image}" alt=""></div>`;
    tableCard.style.zIndex = cardIndex;
  });

  if (gameData.table.length === numOfPlayers()) {
    document
      .getElementById("take-card")
      .setAttribute("class", "hidden btn btn-primary rounded rounded-pill");

    const finishTurn = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          gameData.table = [];
          // clear table and cta

          gameData.players.forEach(function (eachPlayer) {
            document.getElementById(`${eachPlayer}Card`).innerHTML = "";
            document
              .querySelector(`#${eachPlayer}-cta span`)
              .setAttribute("class", "hidden");
          });
          checkWinningCondition();

          resolve();
        }, 2000);
      });
    };
    finishTurn()
      .then(() => {
        conditionalChangeTurn();
        return "Good";
      })
      .then(() => {
        updateCTA();
        gamePlay();
      });
  } else {
    const sequenceFunction = () => {
      return new Promise((resolve) => {
        checkWinningCondition();
        resolve();
      });
    };
    sequenceFunction()
      .then(() => {
        gameData.turn++;
        gameData.turn %= gameData.players.length;

        console.log(gameData.turn + 1);
        conditionalChangeTurn();
      })
      .then(() => {
        gameData.players.forEach((eachPlayer) => {
          updatePlayer(eachPlayer);
        });

        comments.innerHTML = `It is ${gameData.players[gameData.turn]} turn`;
        updateCTA();
        gamePlay();
      });
  }
}

function checkWinningCondition() {
  if (gameData.table.length === 0) {
    gameData.players.forEach(function (player, index) {
      if (gameData[player].length === 0 && gameData.winner[index] == false) {
        gameData.winner[index] = true;

        const playerWon = alert(`${player} has WON!!!`);
        // gameData.players.splice(index, 1);
      }
      if (numOfPlayers() === 1) {
        gameData.winner.forEach((eachWinner, index) => {
          if (!eachWinner) {
            const looserMessage = alert(
              `${gameData.players[index]} is a LOOSER!!!`
            );
          }
        });
        // gameData[gameData.players[index]] = [];
        // updatePlayer(gameData.players[index]);
        clearCTA();
        document
          .getElementById("take-card")
          .setAttribute("class", "hidden btn btn-primary rounded rounded-pill");
        return;
      }
    });
  }
}

function conditionalChangeTurn() {
  if (gameData.winner[gameData.turn]) {
    gameData.turn++;
    gameData.turn %= gameData.players.length;
  }

  if (gameData[`player${gameData.turn + 1}`].length == 0) {
    gameData.turn++;
    gameData.turn %= gameData.players.length;
    console.log(gameData.turn + 1);
  }
}

function determineFirstTurn() {
  // check each card in each player's deck
  gameData.players.forEach(function (eachPlayer, index) {
    gameData[eachPlayer].forEach(function (eachCard) {
      if (eachCard.suit === "diamonds" && eachCard.value === 6) {
        gameData.turn = index;
      }
    });
  });
  comments.innerHTML = `It is player ${gameData.turn + 1} turn`;
  updateCTA();
}

function clearCTA() {
  gameData.players.forEach((eachPlayer) => {
    document.querySelector(`#${eachPlayer}-cta`).style.background = "none";
    document
      .querySelector(`#${eachPlayer}-cta span`)
      .setAttribute("class", "hidden");
  });
}

function updateCTA() {
  document.querySelector(
    `#${gameData.players[gameData.turn]}-cta`
  ).style.background = "red";
  document
    .querySelector(`#${gameData.players[gameData.turn]}-cta span`)
    .setAttribute("class", "visible-inline");
}

function prepareCurrentTurn() {
  const currentTurnCards = document.querySelectorAll(
    `#game-control #${gameData.players[gameData.turn]} li`
  );
  currentTurnCards.forEach(function (eachCard, cardIndex) {
    eachCard.setAttribute("class", "current-turn");

    const thisCard = gameData[gameData.players[gameData.turn]][cardIndex];

    let isStronger = false;

    function findStrongerCards() {
      if (gameData.table.length !== 0) {
        if (
          thisCard.suit === gameData.table[gameData.table.length - 1].suit &&
          thisCard.value > gameData.table[gameData.table.length - 1].value
        ) {
          isStronger = true;
        }
        // gameData.table[gameData.table.length - 1].suit === SUITS.CLUBS
        else if (
          gameData.table[gameData.table.length - 1].suit === "clubs" &&
          thisCard.suit === "clubs" &&
          thisCard.value > gameData.table[gameData.table.length - 1].value
        ) {
          isStronger = true;
        } else if (
          gameData.table[gameData.table.length - 1].suit === "diamonds" &&
          thisCard.suit === "diamonds" &&
          thisCard.value > gameData.table[gameData.table.length - 1].value
        ) {
          isStronger = true;
        } else if (
          (gameData.table[gameData.table.length - 1].suit === "hearts" ||
            gameData.table[gameData.table.length - 1].suit === "spades") &&
          thisCard.suit === "diamonds"
        ) {
          isStronger = true;
        }
      } else {
        isStronger = true;
      }
    }

    findStrongerCards();

    if (isStronger) {
      eachCard.addEventListener("click", function () {
        // async function addHTML() {
        //     // await doesn't work because push() doesn't return a Promise;
        //     const updateHTML = await gameData.table.push(gameData[gameData.players[gameData.turn]][cardIndex]);
        //     const splice = await gameData[gameData.players[gameData.turn]].splice(cardIndex, 1);
        //     updatePlayer(gameData.players[gameData.turn]);

        // }

        // setTimeout(function(){
        //     addHTML();
        //     setTimeout(function(){
        //         updateTableAndTurn();
        //     },0);

        // },0);

        const addHTML = () => {
          return new Promise((resolve) => {
            gameData.table.push(
              gameData[gameData.players[gameData.turn]][cardIndex]
            );
            resolve();
          });
        };

        addHTML()
          .then(() => {
            gameData[gameData.players[gameData.turn]].splice(cardIndex, 1);
            return "Good";
          })
          .then(() => {
            updatePlayer(gameData.players[gameData.turn]);
            return "Good";
          })
          .then(() => {
            updateTableAndTurn();
          });
      });
    }
  });
}

function gamePlay() {
  document
    .getElementById("take-card")
    .setAttribute("class", "hidden btn btn-primary rounded rounded-pill");
  prepareCurrentTurn();

  if (gameData.table.length !== 0) {
    function activateTakeCard() {
      document
        .getElementById("take-card")
        .setAttribute("class", "visible btn btn-primary rounded rounded-pill");
      // removing previous event listener from take-card
      document
        .getElementById("take-card")
        .replaceWith(document.getElementById("take-card").cloneNode(true));

      if (gameData.players[gameData.turn] === "player1") {
        document.getElementById("take-card").style.right = 0;
        document.getElementById("take-card").style.bottom = 0;
        document.getElementById("take-card").style.left = "";
        document.getElementById("take-card").style.top = "";
      } else if (gameData.players[gameData.turn] === "player2") {
        document.getElementById("take-card").style.left = 0;
        document.getElementById("take-card").style.top = 0;
        document.getElementById("take-card").style.right = "";
        document.getElementById("take-card").style.bottom = "";
      } else if (gameData.players[gameData.turn] === "player3") {
        document.getElementById("take-card").style.right = 0;
        document.getElementById("take-card").style.top = 0;
        document.getElementById("take-card").style.bottom = "";
        document.getElementById("take-card").style.left = "";
      }
    }

    activateTakeCard();

    takeCard();

    function takeCard() {
      document.getElementById("take-card").addEventListener("click", () => {
        gameData.table[0].player = gameData.players[gameData.turn];
        gameData[gameData.players[gameData.turn]].push(gameData.table[0]);

        // setTimeout(function () {
        //     gameData.table.shift();
        //     setTimeout(function () {
        //         updatePlayer(gameData.players[gameData.turn]);

        //         setTimeout(function () {
        //             updateTableAndTurn();
        //             // checkWinningCondition();

        //         }, 0);
        //     }, 0);
        // }, 0);

        const sequenceFunction = () => {
          return new Promise((resolve) => {
            gameData.table.shift();
            resolve();
          });
        };
        sequenceFunction()
          .then(() => {
            // updatePlayer(gameData.players[gameData.turn]);
            return "Good";
          })
          .then(() => {
            updateTableAndTurn();
          });
      });
    }
  }
}
createDeck();

dealCards();
determineFirstTurn();

updatePlayer("player1");
updatePlayer("player2");
updatePlayer("player3");

gamePlay();
