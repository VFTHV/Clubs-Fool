# Clubs-Fool
Card game: Clubs Fool (Clubs by clubs Durak)

You can run this game at:
https://vfthv.github.io/Clubs-Fool/

  Description of the project: 
Based on Classic Russian-Ukrainian card game, this game was designed in raw JavaScript code (no libraries).
It manipulated DOM elements to output the app onto an HTML canvas element.
Relied on both event handling and the use of objects
At a later stage this project was partially transferred to Bootsrap 5 CSS.

  Game rules:
The goal of each player is to get rid of all the cards. Whoever did it first is a winner.
Diamonds are trump suit and can beat Hearts and Spades.
All cards in a deck are served among all the players. Players throw cards clockwise one-by-one. Next
player has to beat previous player's card, or take the lower card on the table.
If number of cards on the table equals the number of players, then these cards are discarded. Then the last 
player to throw a card, goes with a card again. And the cycle repeats.
Clubs may not be beaten by trump, only by other clubs. 
The trump suit cannot be clubs. Note that clubs do not beat trump; they act as a special suit, not a super-trump

  You can find full set of rules here: 
https://en.wikipedia.org/wiki/Durak#Variants
