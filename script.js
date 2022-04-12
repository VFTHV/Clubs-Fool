

const gameData = {
    players: ['player1', 'player2', 'player3'],
    turn: 0,
    deck: [ /* {suit: "type of suit", value: Number, image: link} */],
    player1: [ /* {suit: "type of suit", value: Number, image: link, player: "player1"} */],
    player2: [ /* {suit: "type of suit", value: Number, image: link, player: "player1"} */],
    player3: [ /* {suit: "type of suit", value: Number, image: link, player: "player1"} */],
    table: []
}

// const numOfPlayers = prompt('Please enter number of players');

// for (let i=0; i<numOfPlayers; i++) {
//     gameData.players.push(`player${i+1}`);
// }

// const cardOrder = [6, 7, 8, 9, 10, 11, 12, 13, 14];
const cardOrder = [6, 7, 8];
/*
    const SUITS = Object.freeze({
        HEARTS: 'hearts',
    })

    let cardSuits = Object.vales(SUITS);
*/
// const cardSuits = ['hearts', 'spades', 'diamonds', 'clubs'];

const cardSuits = Object.freeze({
    // hearts: 'hearts',
    spades: 'spades',
    diamonds: 'diamonds',
    // clubs: 'clubs'
})

// const deck = [];
let comments = document.getElementById('comments');
let takeCard = document.getElementById('take-card');

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
                image: `images/${cardOrder[i]}-${eachSuit}.png`
            })
        }
    });
}

function dealCards() {

    let cardCounter = 0;
    let playerCounter = 0;

    for (let i = 0; i < (cardOrder.length * Object.keys(cardSuits).length); i++) {
        playerCounter %= gameData.players.length;
        const randomCard = Math.floor(Math.random() * gameData.deck.length)

        gameData[`player${playerCounter + 1}`].push(gameData.deck[randomCard]);
        // gameData[gameData.players[playerCounter]].push(gameData.deck[randomCard]);
        gameData[`player${playerCounter + 1}`][gameData[`player${playerCounter + 1}`].length - 1].player = `player${playerCounter + 1}`;
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
    gameData.players.forEach(function (eachPlayer) {
        document.getElementById(`${eachPlayer}Card`).innerHTML = '';
    });

    clearCTA();

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

            gameData.players.forEach(function (eachPlayer) {

                document.getElementById(`${eachPlayer}Card`).innerHTML = '';
                document.querySelector(`#${eachPlayer}-cta span`).setAttribute('class', 'hidden');

            });

            checkWinningCondition();
            setTimeout(function () {
                updateCTA();
                gamePlay();
            }, 0);
        }, 2000);


        // const updatePromise = new Promise(function (resolve) {
        //     setTimeout(() => {
        //         gameData.table = [];
        //         gameData.players.forEach(function (eachPlayer){

        //             document.getElementById(`${eachPlayer}Card`).innerHTML = '';
        //             document.querySelector(`#${eachPlayer}-cta span`).setAttribute('class', 'hidden');

        //         });
        //         checkWinningCondition();
        //     }, 2000);       

        // })

        // updatePromise.then(updateCTA).then(gamePlay);

        /*
            // 1) create a funciton, call it timer
            // 2) the function takes a delay, in ms
            // 3) inside of the function we create a promise which holds a setTimeout
            // 4) we return the promise which resolves in `delay`
            // MDN https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise

            awaitTimer(1000) // retuns Promise
            .then(function() {
                //
                return awaitTimer(0)
            })
            .then()
        */

    }
    else {
        gameData.turn++;
        gameData.turn = gameData.turn % gameData.players.length;
        checkWinningCondition();
        console.log(gameData.turn+1);
        comments.innerHTML = `It is player ${gameData.players[gameData.turn]} turn`;

        updateCTA();
        gamePlay();
    }
}

function checkWinningCondition() {

    if (gameData.table.length === 0) {
        // if winning player was last to go, then turn++
        // if winning player was in the middle of the turn 
        const wonPlayersIndex = [];

        gameData.players.forEach(function (player, index) {
            // if one player wins, 3rd player's turn shifts
            if (gameData[player].length === 0) {
                if (player == 'player3'){
                    gameData.turn++;
                    gameData.turn%=gameData.players.length;
                }

                const playerWon = alert(`${player} has WON!!!`)
                gameData.players.splice(index, 1);





            }
            if (gameData.players.length === 1) {
                const looserMessage = alert(`${gameData.players[0]} is a LOOSER!!!`);
                gameData[gameData.players[0]] = [];
                updatePlayer(gameData.players[0]);
                clearCTA();
                document.getElementById('take-card').setAttribute('class', 'hidden');
                return;
            }
        });

    }
}

function determineFirstTurn() {
    // check each card in each player's deck
    gameData.players.forEach(function (eachPlayer, index) {
        gameData[eachPlayer].forEach(function (eachCard) {
            if (eachCard.suit === 'diamonds' && eachCard.value === 6) {
                gameData.turn = index;
            }
        });
    });
    comments.innerHTML = `It is player ${gameData.turn + 1} turn`;
    updateCTA();
}

function clearCTA() {
    gameData.players.forEach((eachPlayer) => {
        document.querySelector(`#${eachPlayer}-cta`).style.background = 'none';
        document.querySelector(`#${eachPlayer}-cta span`).setAttribute('class', 'hidden');
    });
    // document.querySelector(`#${gameData.players[gameData.turn]}-cta`).style.background = 'none';    
    // document.querySelector(`#${gameData.players[gameData.turn]}-cta span`).setAttribute('class', 'hidden');    
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

        let isStronger = false;

        function findStrongerCards() {
            if (gameData.table.length !== 0) {
                if ((thisCard.suit === gameData.table[gameData.table.length - 1].suit) &&
                    (thisCard.value > gameData.table[gameData.table.length - 1].value)) {
                    isStronger = true;
                }
                // gameData.table[gameData.table.length - 1].suit === SUITS.CLUBS
                else if ((gameData.table[gameData.table.length - 1].suit === 'clubs') &&
                    (thisCard.suit === 'clubs' && thisCard.value > gameData.table[gameData.table.length - 1].value)) {
                    isStronger = true;
                }
                else if ((gameData.table[gameData.table.length - 1].suit === 'diamonds') &&
                    (thisCard.suit === 'diamonds' && thisCard.value > gameData.table[gameData.table.length - 1].value)) {
                    isStronger = true;
                }
                else if ((gameData.table[gameData.table.length - 1].suit === 'hearts' ||
                    gameData.table[gameData.table.length - 1].suit === 'spades') &&
                    (thisCard.suit === 'diamonds')) {
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
                    // await doesn't work because push() doesn't return a Promise;
                    const updateHTML = await gameData.table.push(gameData[gameData.players[gameData.turn]][cardIndex]);
                    const splice = await gameData[gameData.players[gameData.turn]].splice(cardIndex, 1);
                    updatePlayer(gameData.players[gameData.turn]);

                }
                // use awaitTimer here
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

        takeCard();

        function takeCard() {

            document.getElementById('take-card').addEventListener('click', ()=>{
                gameData.table[0].player = gameData.players[gameData.turn];
                gameData[gameData.players[gameData.turn]].push(gameData.table[0]);
                /*
                    awaitTimer(100)
                    .then(()=> {
                        //  gameData.table.splice(0, 1);
                        return awaitTimer(100) 
                    })
                    .then(()=> {
                        // updatePlayer(gameData.players[gameData.turn]);
                            return awaitTimer(100) 
                    })

                */
                setTimeout(function () {
                    gameData.table.shift();
                    setTimeout(function () {
                        updatePlayer(gameData.players[gameData.turn]);

                        setTimeout(function () {
                            updateTableAndTurn();
                            // checkWinningCondition();

                        }, 0);
                    }, 0);
                }, 0);
            });
        }
    }
}
createDeck();

dealCards();

updatePlayer('player1');
updatePlayer('player2');
updatePlayer('player3');

determineFirstTurn();

gamePlay();