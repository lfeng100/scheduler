## Overview
The frontend repository provides a web interface for our ToDo note taking application that displays data persisted in our DB. It is written in React and utilizes various components and libraries to layout the UI. It talks to backend via HTTP requests.

## Design
- All components are within the ```src/components``` directory.
- ```src/components/App.js``` represents the outermost component, which contains the Header, Footer, and Body (and Verification) views.
- Universal styling is within the styles.css file under ```public``` directory.
- Main package dependencies used in the design are Material UI and Bootstrap.

## Installation
Follow the following steps for setting up the backend:
- Clone the repository and navigate into the ```cs348-project``` directory
- Ensure a stable version of npm is installed
- Ensure the backend is running locally (on http://localhost:8000). Instructions on backend repository.
- In this project directory, run ```npm install```. This installs all requried dependencies for the project.
- For development: run ```nodemon --exec npm start```
- For production: run ```npm start```

Open [http://localhost:3000](http://localhost:3000) to view it on the browser.
