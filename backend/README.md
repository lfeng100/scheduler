# Backend

## Overview
The backend repository provides a server for the frontend to communicate with. It is written in NodeJS and utilizes several frameworks to enhance the security and functionality of the application.

## Architecture
The server is composed of two parts: the database, and a web app server which implements a RESTful API for connecting with the frontend. For this project, we use a MySQL database that is hosted on one of our servers. You can connect to the database using applications such as MySQLWorkBench, or using the terminal. Note that you need to have mysql installed on your local machine. Instructions for installing MySQL can be found online. The credentials of the database can be found in the ```db.config.js``` file.

## Design Pattern
The server follows a MVC pattern. Some directories of interest are:
- The ```bin``` directory contains script for starting and running the backend. It contains important information such as port number for the server and debugging options.
- The ```config``` directory contains the database configuration and connects PassportJS, a framework for simplifying login procedures with the SQL Server
- The ```controllers``` directory contains the controller functions for the routes.
- The ```email``` directory contains credentials for sending emails to the user.
- The ```models``` directory contains database Schema models
- The ```routes``` directory contains API endpoints for the
- Entry point to the server is provided in the ```app.js``` file.

## Installation
Follow the following steps for setting up the backend:
- Clone the repository
- Make sure you have NodeJS 14 or later installed on your computer
- Run ```npm install```. Make sure that the proces is successful
- For development: run ```nodemon start```
- For production: run ```npm start```
