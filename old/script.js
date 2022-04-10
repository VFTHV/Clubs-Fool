const gameData = {
    players: ['player1', 'player2', 'player3'],
    turn: 0,
    player1: [],
    player2: [],
    player3: [],
    table: []
}

let cardOrder = [6,7,8,9,10,11,12,13,14];
let cardSuits = ['hearts',  'spades', 'diamonds', 'clubs'];
const cardDeck = [];

function createDeck() {

    cardSuits.forEach(function(eachSuit, index){
        for (i=0; i<9;i++) {

            cardDeck[i+(index*9)] = {
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
    
    for (i = 0; i < 36; i++) {
        playerCounter = playerCounter%3;
        let randomCard = Math.floor(Math.random() * cardDeck.length)

        gameData[`player${playerCounter+1}`].push(cardDeck[randomCard]);
        cardDeck.splice(randomCard,1);
        playerCounter++;
        
    }

}

function updatePlayer (player) {
    let sortedBySuit = [];
    let sortedDeck = [];

    for (let i = 0; i < cardSuits.length; i++) {

        gameData[player].forEach(function(eachCard, index) {
            if (eachCard.suit === cardSuits[i]) {
                sortedBySuit.push(gameData[player][index]);
            }
        });
    
        sortedBySuit.sort(function(a,b) {
            return a.value - b.value
        });
        sortedDeck = sortedDeck.concat(sortedBySuit);
        sortedBySuit = [];

    }
    gameData[player] = sortedDeck;

    document.getElementById(player).innerHTML = '';

    gameData[player].forEach(function(eachCard){
        document.getElementById(player).innerHTML += `<li><img src=${eachCard.image}></li>`; 
    });
}

function updateTableAndTurn() {
    // add last card in object into current player's card with corresponding (array index) z-index
    const tableCard = document.getElementById(`player${gameData.turn+1}Card`);

    tableCard.innerHTML += `<img src="${gameData.table[gameData.table.length-1].image}" alt="">`;
    tableCard.style.zIndex = cardZIndex;
    
    // if number of cards equals number of players, then empty the array
    if (gameData.table.length === gameData.players.length) {
        cardZIndex = 0;

        setTimeout(function(){
            gameData.table = [];
            document.querySelector('#table ul').innerHTML = 
            `<li id="player1Card"></li>
            <li id="player2Card"></li>
            <li id="player3Card"></li>`;
        },2000);

    }
    else {
        if (gameData.turn === (gameData.players.length-1) ) {
            gameData.turn = 0;
            cardZIndex++;
        }
        else {
            gameData.turn++;
            cardZIndex++;
        }
    }
    // prepareFirstTurn();
     
}

function determineFirstTurn() {
    gameData.player1.forEach(function(eachCard){
        if (eachCard.suit === 'diamonds' && eachCard.value === 6) {
            gameData.turn = 0;
        }
    });
    gameData.player2.forEach(function(eachCard){
        if (eachCard.suit === 'diamonds' && eachCard.value === 6) {
            gameData.turn = 1;
        }
    });
    gameData.player3.forEach(function(eachCard){
        if (eachCard.suit === 'diamonds' && eachCard.value === 6) {
            gameData.turn = 2;
        }
    });
}

function prepareCurrentTurn() {

    const currentTurnCards = document.querySelectorAll(`#game-control #player${gameData.turn+1} li`);
    currentTurnCards.forEach(function(eachCard){
        eachCard.classList.add('current-turn');
    });

    const canBeat = document.querySelectorAll('.can-beat');
    
    canBeat.forEach(function(eachCard, cardIndex){
        eachCard.addEventListener('click', function(){

            async function addHTML () {
                const updateHTML = await gameData.table.push(gameData[`player${gameData.turn+1}`][cardIndex]);
                const splice = await gameData[`player${gameData.turn+1}`].splice(cardIndex,1);
                updatePlayer(`player${gameData.turn+1}`);               
            }
            
            setTimeout(function(){
                addHTML();
                setTimeout(function(){
                    updateTableAndTurn();
                    setTimeout(function(){
                        gamePlay();
                    },0);
                },0);
            },0);  
        });
    });

}

function findStrongerCards () {

    
    if (gameData.table.length === 0) {

        

        // document.querySelectorAll(`#game-control #player${gameData.turn+1} li`).forEach(function(eachCard){
        //     eachCard.classList.add('can-beat');
        // });
    }
    

    // if table last card is 'hearts' then all diamonds and higher
    // hearts: add class "can-beat"
    // same with spades

    // if clubs - only higher clubs

    // if diamonds - only higher diamonds
}

function gamePlay() {

    if (gameData.table.length === 0) {
        // add class 'can-beat' to all cards
        const allCards = document.querySelectorAll(`#game-control #player${gameData.turn+1} li`);
        allCards.forEach(function(eachCard){
            eachCard.classList.add('can-beat');
        });

        prepareCurrentTurn();
        
        // prepare current turn

        // after click remove all classes from all cards
        // change turn
        // gamePlay()



    }
    else {
        // add 'current turn' to all cards
        // find stronger cards and add 'can beat' class to them
        // 'can-beat' cards add event listener for click
        // after click remove all classes from all cards
        // change turn
        // gamePlay()



        function takeCard () {
            // add take button
            // take lower card (first card in gameData.table array)
            // into current player's deck
            // update table DOM
            // update player's DOM
            // change player
            // gamePlay()
        }
    }

}

createDeck();

dealCards();

updatePlayer('player1');
updatePlayer('player2');
updatePlayer('player3');

determineFirstTurn();

// prepareCurrentTurn();

console.log(`It is player ${gameData.turn+1} turn`);

let cardZIndex = 0;

gamePlay();


