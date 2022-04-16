

const gameData = {
    players: ['player1', 'player2', 'player3'],
    turn: 0,
    player1: [],
    player2: [],
    player3: [],
    table: []
}

// const numOfPlayers = prompt('Please enter number of players');

// for (let i=0; i<numOfPlayers; i++) {
//     gameData.players.push(`player${i+1}`);
// }

let cardOrder = [6, 7, 8, 9, 10, 11, 12, 13, 14];
// let cardOrder = [6,7];
let cardSuits = ['hearts', 'spades', 'diamonds', 'clubs'];
// let cardSuits = ['hearts', 'spades', 'diamonds'];
const cardDeck = [];
let comments = document.getElementById('comments');
let takeCard = document.getElementById('take-card');

function createDeck() {
    cardSuits.forEach(function (eachSuit, index) {
        for (i = 0; i < cardOrder.length; i++) {
            cardDeck[i + (index * cardOrder.length)] = {
                suit: eachSuit,
                value: cardOrder[i],
                image: `images/${cardOrder[i]}-${eachSuit}.png`
            }
        }
    });
}

function dealCards() {

    let cardCounter = 0;
    let playerCounter = 0;

    for (let i = 0; i < (cardOrder.length*cardSuits.length); i++) {
        playerCounter = playerCounter % gameData.players.length;
        let randomCard = Math.floor(Math.random() * cardDeck.length)

        gameData[gameData.players[playerCounter]].push(cardDeck[randomCard]);
        gameData[gameData.players[playerCounter]][gameData[gameData.players[playerCounter]].length - 1].player = gameData.players[playerCounter];
        cardDeck.splice(randomCard, 1);
        playerCounter++;
    }
}

function updatePlayer(player) {
    let sortedBySuit = [];
    let sortedDeck = [];
    // sort all cards by suits and values
    for (let i = 0; i < cardSuits.length; i++) {

        gameData[player].forEach(function (eachCard, index) {
            if (eachCard.suit === cardSuits[i]) {
                sortedBySuit.push(gameData[player][index]);
            }
        });

        sortedBySuit.sort(function (a, b) {
            return a.value - b.value
        });
        sortedDeck = sortedDeck.concat(sortedBySuit);
        sortedBySuit = [];

    }
    gameData[player] = sortedDeck;

    document.getElementById(player).innerHTML = '';

    gameData[player].forEach(function (eachCard) {
        document.getElementById(player).innerHTML += `<li><img src=${eachCard.image}></li>`;
    });
}

function updateTableAndTurn() {
    // clear table
    gameData.players.forEach(function(eachPlayer){
        document.getElementById(`${eachPlayer}Card`).innerHTML = '';
    });

    clearCTA();

    // checkWinningCondition();
    // update table
    gameData.table.forEach(function (eachCard, cardIndex) {

        const tableCard = document.getElementById(`${eachCard.player}Card`);
        tableCard.innerHTML += `<li><img src="${eachCard.image}" alt=""></div>`;
        tableCard.style.zIndex = cardIndex;

    });

    if (gameData.table.length === gameData.players.length) {

        document.getElementById('take-card').setAttribute('class', 'hidden');
        

        setTimeout(function () {
            gameData.table = [];
            // clear table and cta

            gameData.players.forEach(function (eachPlayer){

                document.getElementById(`${eachPlayer}Card`).innerHTML = '';
                document.querySelector(`#${eachPlayer}-cta span`).setAttribute('class', 'hidden');
            
            });
            checkWinningCondition();
            setTimeout(function () {
                updateCTA();
                gamePlay();
            }, 0);
        }, 2000);

    }
    else {
        checkWinningCondition();
        gameData.turn++;
        gameData.turn = gameData.turn%gameData.players.length;
        comments.innerHTML = `It is player ${gameData.players[gameData.turn]} turn`;

        updateCTA();
        gamePlay();
    }
}

function checkWinningCondition() {
    if (gameData.table.length ===0) {
        const wonPlayersIndex = [];
        gameData.players.forEach(function(eachPlayer, index) {
            if (gameData[eachPlayer].length === 0) {

                const playerWon = alert(`${eachPlayer} has WON!!!`)
                // comments.innerHTML = `${eachPlayer} has WON!!!`;
                // document.getElementById(`${gameData.players[gameData.turn]}-cta`).innerHTML = '';
                wonPlayersIndex.push(index);
                console.log(wonPlayersIndex);
                // gameData.players.splice(index,1);
                // gameData.turn++;
            }
            if (gameData.players.length === 1) {
                const looserMessage = alert(`${gameData.players[0]} is a LOOSER!!!`);
                gameData[gameData.players[0]] = [];
                updatePlayer(gameData.players[0]);
            }
        });
        wonPlayersIndex.forEach(function(eachPlayerIndex){
            gameData.players.splice(eachPlayerIndex,1);
        }); 
    }
}

function determineFirstTurn() {
    // check each card in each player's deck
    gameData.players.forEach(function(eachPlayer, index){
        gameData[eachPlayer].forEach(function(eachCard){
            if (eachCard.suit === 'diamonds' && eachCard.value === 6) {
                gameData.turn = index;
            }
        });
    });
    comments.innerHTML = `It is player ${gameData.turn + 1} turn`;
    updateCTA();
}

function clearCTA() {
    document.querySelector(`#${gameData.players[gameData.turn]}-cta`).style.background = 'none';    
    document.querySelector(`#${gameData.players[gameData.turn]}-cta span`).setAttribute('class', 'hidden');    
}

function updateCTA() {
    document.querySelector(`#${gameData.players[gameData.turn]}-cta`).style.background = 'red';    
    document.querySelector(`#${gameData.players[gameData.turn]}-cta span`).setAttribute('class', 'visible-inline');    
}

function prepareCurrentTurn() {

    const currentTurnCards = document.querySelectorAll(`#game-control #${gameData.players[gameData.turn]} li`);
    currentTurnCards.forEach(function (eachCard, cardIndex) {
        eachCard.setAttribute('class', 'current-turn');

        const thisCard = gameData[gameData.players[gameData.turn]][cardIndex];

        // console.log(thisCard.suit)
        let isStronger = false;

        function findStrongerCards() {
            if (gameData.table.length !== 0) {
                if ( (thisCard.suit === gameData.table[gameData.table.length - 1].suit) &&
                (thisCard.value > gameData.table[gameData.table.length - 1].value) ) {
                    isStronger = true;
                }
                else if ( (gameData.table[gameData.table.length - 1].suit === 'clubs') &&
                (thisCard.suit === 'clubs' && thisCard.value > gameData.table[gameData.table.length - 1].value) ) {
                    isStronger = true;
                }
                else if ( (gameData.table[gameData.table.length - 1].suit === 'diamonds') &&
                (thisCard.suit === 'diamonds' && thisCard.value > gameData.table[gameData.table.length - 1].value) ) {
                    isStronger = true;
                }
                else if ( (gameData.table[gameData.table.length - 1].suit === 'hearts' ||
                    gameData.table[gameData.table.length - 1].suit === 'spades') &&
                    (thisCard.suit === 'diamonds') ) {
                    isStronger = true;
                }
            }
            else {
                isStronger = true;
            }
        }

        findStrongerCards();

        if (isStronger) {

            eachCard.addEventListener('click', function () {

                async function addHTML() {
                    const updateHTML = await gameData.table.push(gameData[gameData.players[gameData.turn]][cardIndex]);
                    const splice = await gameData[gameData.players[gameData.turn]].splice(cardIndex, 1);
                    updatePlayer(gameData.players[gameData.turn]);

                }

                setTimeout(function () {
                    addHTML();
                    setTimeout(function () {
                        updateTableAndTurn();
                    }, 0);

                }, 0);
            });

        }

    });

}

function gamePlay() {
    document.getElementById('take-card').setAttribute('class', 'hidden');
    prepareCurrentTurn();

    if (gameData.table.length !== 0) {

        function activateTakeCard() {
            document.getElementById('take-card').setAttribute('class', 'visible');
            // removing previous event listener from take-card
            document.getElementById('take-card').replaceWith(document.getElementById('take-card').cloneNode(true));
            
            if (gameData.players[gameData.turn] === 'player1') {
                document.getElementById('take-card').style.right = 0;
                document.getElementById('take-card').style.bottom = 0;
                document.getElementById('take-card').style.left = '';
                document.getElementById('take-card').style.top = '';
            }
            else if (gameData.players[gameData.turn] === 'player2') {
                document.getElementById('take-card').style.left = 0;
                document.getElementById('take-card').style.top = 0;
                document.getElementById('take-card').style.right = '';
                document.getElementById('take-card').style.bottom = '';
            }
            else if (gameData.players[gameData.turn] === 'player3') {
                document.getElementById('take-card').style.right = 0;
                document.getElementById('take-card').style.top = 0;
                document.getElementById('take-card').style.bottom = '';
                document.getElementById('take-card').style.left = '';
            }
        }

        activateTakeCard();

        document.getElementById('take-card').addEventListener('click', function (event) {
            event.preventDefault();

            takeCard();

            function takeCard() {

                gameData.table[0].player = gameData.players[gameData.turn];
                gameData[gameData.players[gameData.turn]].push(gameData.table[0]);
                setTimeout(function () {
                    gameData.table.splice(0, 1);
                    setTimeout(function () {
                        updatePlayer(gameData.players[gameData.turn]);

                        setTimeout(function () {
                            // checkWinningCondition();
                            updateTableAndTurn();
                            
                        }, 0);
                    }, 0);
                }, 0);
            }
        });
    }
}
createDeck();

dealCards();

updatePlayer('player1');
updatePlayer('player2');
updatePlayer('player3');

determineFirstTurn();

gamePlay();