# Clubs-Fool
Card game: Clubs Fool (Clubs by clubs Durak)

You can run this game at:
https://vfthv.github.io/Clubs-Fool/

  Description of the project: 
This is an imitation of a 3-player card game
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

Click on this [link](https://vfthv.github.io/Clubs-Fool/) see live website 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- Play with cards: beat weaker cards or take loer card in deck
- Win when the player gets rid of all cards
- Get winning message at the end of the game

### Screenshot

![clubs_fool_screenshot](https://user-images.githubusercontent.com/101958139/190836943-b33c918c-dbe2-46f2-a7dd-ee294b3cd336.png)

### Links

- Live Site URL: [Clubs Fool](https://vfthv.github.io/Clubs-Fool/) 

## My process

- Identify logics behind game flow
- Build logics using functions for following: 
    Recognition of stronger card
    Winning Condition
    Card deck shuffling and dealing
    Taking smaller card 
    etc.
- Add HTML markup
- Refactor the code

### Built with

- Bootstrap
- SCSS
- Vanilla JS

### What I learned

- Advanced JS array methods
- Got better at JS object methods
- Enhanced my knowledge about setTimeOut()

### Continued development

- I'd like to advance my skills at API

## Author

- LinkedIn - <a href="https://www.linkedin.com/in/vadim-fthv/">![LinkedIn Logo](https://user-images.githubusercontent.com/101958139/189750228-d0c111e2-6d7f-4fe7-8bb2-dbc13b28991e.png "LinkedIn")
</a>

