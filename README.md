# VRQuest
VR Space shooter made with Unity

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Collaboration](#collaboration)
5. [FAQs](#faqs)

## General Info
***
This a simple VR game in which you control a little spaceship, moving it around with your hand, shooting at asteroids and getting new high records.
After creating an account, you'll be able to play the game, upload your records and use the web to customize your profile, see your stats and the global ranking.

The web and the game are still a Work In Progress.

### Screenshot
![Image text](https://www.united-internet.de/fileadmin/user_upload/Brands/Downloads/Logo_IONOS_by.jpg)

## Technologies
***
This project uses mainly the following technologies:

* [NodeJS](https://nodejs.org/): The JS runtime. Used in both backend & frontend.

For the backend:
* [Express](https://expressjs.com): The API
* [Prisma](https://www.prisma.io): The ORM
* [MySQL](https://www.mysql.com): The database

For the game:
* [Unity](https://unity.com): The game engine.
* TODO: Add info about XR

For the web frontend:
* [React](https://reactjs.org): The web framework
* TODO: Maybe add the libraries I guess.

## Requirements
***
* NodeJS, at least version 16.3.0.
* Unity 2021.3.11, if you want to check out the game.
* A VR headset to play the game. The game supports several kinds of headsets but it was developed with the Quest 2.
* MySQL
## Installation
***
- First, clone this repository:
```
git clone https://github.com/GabRodPul/VRQuest.git
cd VRQuest
```

- In the frontend folder, run:
```
npm install
```

- Now, in the backend-prisma-ts folder, create a .env file that contains:
```
JWT_SECRET=YOUR_JWT_SECRET # Used for encrypting passwords

# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings
DATABASE_URL="mysql://user:pass@localhost:port/databasename"
```

- In the same folder, run ```npm install``` as you did in the frontend folder, and then create the database with Prisma:
```
npm run dbpush
npm run postinstall
```

Run npm start in both the frontend and backend and you will have the web and the server running.
Make sure your 8080 port isn't being used as it is the one this project uses.

### Accesibility
### Aspect


## (3.) Prototyping 🔧
describes pruebas y añades imágenes
... incluso vídeo

## Ejecutando las pruebas ⚙️

