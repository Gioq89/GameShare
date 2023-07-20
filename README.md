# GameShare

  ## Description
  GameShare is an all-in-one free-to-play game library and networking platform for gamers looking to expand their gaming profiles. With over 500 free-to-play games from the FreetoGame API, GameShare allows users to browse new titles and add them to their own personal game library for future reference. By entering what their favorite genre of game is and what platform they play on, users can find other gamers with similar interests. With each user populating their profiles with their own gaming histories, the door to discovering new game titles and friends opens through a easy-to-use web interface. 

  ## Table of Contents
  [Features](#features)\
  [Installation](#installation)\
  [Usage](#usage)\
  [License](#license)\
  [Deployed Application](#deployed)\
  [Contributors](#contributors)\
  [Questions](#questions)

## Features <a name ='features'></a>
- Browse through over 500 free-to-play games, complete with descriptions and screenshots 
- Create and personalize your own gaming profile to store games you want to play and your gaming preferences
- Connect with other users to see their gaming libraries for inspiration on what you can play next

## Installation <a name ='installation'></a>
  To run GameShare locally, the following packages are required:
  - express
  - express-session
  - express-handlebars
  - connect-session-sequelize
  - sequelize
  - dotenv
  - bcrypt
  - mysql2

GameShare also utilizes the following new packages:
- shuffle-array
- axios

All packages can be installed by running ```npm install``` within the root directory of the application.

To set-up the website with the provided example data, make a copy of the .env.EXAMPLE file and fill the fields with your respective MySQL credentials. You can run ```node seeds/seed.js``` in order to populate the database with example users to test the website out with. To start the application, enter ```npm start``` into the console when at the root of the directory after installing all packages and populating the database. 

  ## Usage <a name ='usage'></a>
  You can run GameShare either locally or access the fully deployed site on Heroku at [this link](https://gameshare-97b263a86cef.herokuapp.com/). When first visiting GameShare, you will be prompted to either login or sign-up from the landing page. Upon being logged in, you can browse the over 500 games of the FreetoGame database on your Dashboard and add them to your library by clicking on a respective game's thumbnail. 

  You user profile will contain all information that you would like to show other users and is how you will distinguish yourself with other users who also use the site. Fill out your favorite genre and platform you play on in order to connect with other users who play similarly. 

  The Connect page is where you will be able to find other users who have similar interests. You can shuffle through users and click on them to view their profile. If you are interested in revisiting the user at a later point in time, you can visit their profile and connect with them.
    
  ![](https://github.com/Gioq89/Group-2/blob/main/public/assets/gameshare_demo.gif)

## Deployed Application <a name ='deployed'></a>
GameShare is being hosted by Heroku at this link: https://gameshare-97b263a86cef.herokuapp.com/

  ## License <a name ='license'></a>
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\
  This project uses the MIT license.\
  You can find the licensing details at [this link](https://opensource.org/license/mit/).

  All games found in GameShare are extracted from the [FreetoGame API Database](https://www.freetogame.com/api-doc).

  ## Contributors <a name ='contributors'></a>
  The following contributors were in charge of the development of GameShare:

  Giomendes Quezada - [Gioq89](https://github.com/Gioq89)  
  Riku Choy - [rikuchoy](https://github.com/rikuchoy)  
  Liana Pakingan - [lpakingan](https://github.com/lpakingan)  

  ## Questions <a name ='questions'></a>
  If you have any questions/suggestions regarding this application, please reach out to any of the collaborators of this project or by opening an issue.

