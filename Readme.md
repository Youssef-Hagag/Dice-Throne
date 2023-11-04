# Dice Throne Online - Project 5

Dice Throne Online is a simple Interface for playing the popular dice game [Dice Throne](https://www.dicethrone.com/). Built using the html, css, javascript and Python's web-framework Django for CS50W's final Project Capstone.

## Features

- Choosing a character from the character selection page
- Viewing the character's tokens, cards, and different set of dice
- Dice manipulation (Rolling and locking dice)
- Deck manipulation (Drawing and playing cards. Viewing, Shuffling or resetting the deck)
- Upgrading any of the skills on the hero board
- Adding new characters and cards via the django admin interface

## Running the application

1. open the cmd and navigate to the project directory
2. run `python manage.py runserver` 
3. open `127.0.0.1:8000` or `localhost:8000` in your browser

## Distinctiveness and Complexity

This project is completely different from any other project I have done throughout the course, and yet it touches on everything I learned and is also 
a fun project that I enjoyed every moment of creating.

The motivation for this project was originally just to play the game with my friend. We don't have Dice Throne in our local area, and shipping it
to where we live would be too costly. So I had this fun idea of creating a website that we can then stream to each other on discord as if we were playing
the game together in real time.

In terms of complexity, most of the complexity in this project lies in 3 points: 
1. Player interaction handling using javascript, since the player can draw cards, play them, view them in the deck or the discard pile, roll or lock dice
   and upgrade any of the skills on the hero board.
2. Styling, and then making the application mobile responsive, those 2 things were definitely the most time consuming parts of the project.
3. The vast amount of customization for heroes. Each hero has their own hero board, deck, set of dice with different icons, set of tokens (effects), in addition
   to their own theme color (showing in the selection page and on their set of dice).

And while it may not be the most complex final project idea out there, I personally think it has enough complexity and creativity, while also being an project that 
I had a lot of fun developing, will have a lot of fun using, and am really proud of how it turned out.

## Files & Directories

- `game`
   - `static`
      - `boards`, `icons`, `portraits`, `other images`: a simple file system containing all the images required to play the game, including dice icons,
        hero boards and selection page portraits, etc. 
      - `scripts`
         - `game.js`: this file handles all the player interaction that the user can do after choosing their hero, from drawing cards to playing them, 
           to shuffling their deck, rolling dice, manipulating token values, etc.
      - `styles`
         - `styles.css`: all the styles for the application.

   - `templates`
     - `layout.html`: a simple layout for the other pages.
     - `index.html`: the landing page for the application, which is also the hero selection page.
     - `hero.html`: the main page where all the fun is, this is where the player goes after choosing their hero, and where they get to play the game.
   - `admin.py`: contains the models which are displayed in the admin panel.
   - `models.py`: contains all the models required for the game to function, like heroes, cards, tokens and upgrades.
   - `urls.py`: contains the urls for the application.
   - `views.py`: contains only 2 views, one for each page, this project has a pretty simple server side aside from models, but as mentioned, most
                 of its complexity lies in player interaction and customization.

- `dice-throne`
  - `settings.py`: default application settings.
  - `urls.py`: project's urls.
- `db.sqlite3`: the database file storing all the character's information and details.

Some django files that were auto generated are not mentioned like `tests.py` or `__init__.py`.

## How to play

If you are interested in learning how to play Dice Throne yourself, check out the game's awesome [Rulebook](https://cdn.shopify.com/s/files/1/0045/4013/7562/files/Dice_Throne_Rulebook_-_v2.3.2_-_2022.02.28.pdf?v=1651083636) to learn everything.

## Credits

This project is not associated with the creators of the game Dice Throne. All rights, including but not limited to, game rules, gameplay mechanics, artwork, and any related content, are owned by the respective creators and owners of Dice Throne.

- **Dice Throne Website:** [Official Dice Throne Website](https://www.dicethrone.com/)
- **Game Creators:** [Roxley Games](https://roxley.com/) and [Nate Chatellier](http://www.natechatellier.com/)

Please note that this project is purely fan-made and is intended for educational and entertainment purposes only. No copyright infringement is intended.
