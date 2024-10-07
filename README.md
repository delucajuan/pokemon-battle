# Pokémon Battle Application

## Table of Contents

- [Description](#description)
- [Features](#features)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Technologies Used](#technologies-used)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
- [Installation](#installation)
  - [Using Docker](#using-docker)
  - [Locally](#locally)
- [Author](#author)

## Description

This is a full-stack Pokémon battle application that allows users to select a Pokémon, view its stats, initiate battles with a randomly selected opponent, and review recent results. The project integrates a backend API and a web frontend, working together to provide functionality for listing and battling Pokémon.

## Features

### Backend:

- Database migrations to populate Pokémon data.
- Endpoints to list Pokémon, initiate battles, and retrieve past results.
- Stores battle results.
- Battle algorithm:
  - Higher speed Pokémon attacks first, or higher attack if speeds are equal.
  - Damage is `attack - defense`, with a minimum of 1.
  - Battles continue in turns until a Pokémon's HP reaches zero.
- Swagger documentation for all endpoints.

### Frontend:

- UI to list and select Pokémon for battle.
- Random opponent selection and battle result display.
- History of the last 10 battle results.
- Mobile responsive design.

## Technologies Used

### Backend:

- NestJS
- TypeScript
- TypeORM
- SQLite
- Swagger

### Frontend:

- React
- TypeScript
- Material UI
- React Query

## Installation

### Using Docker

1. Ensure that Docker is installed and running on your system. You can download Docker from the [official Docker website](https://www.docker.com/products/docker-desktop) or follow the installation instructions in the [Docker documentation](https://docs.docker.com/get-docker/).
2. Clone the repository and navigate to the root directory:

   ```bash
   git clone https://github.com/delucajuan/pokemon-battle.git
   cd pokemon-battle
   ```

3. Create a `.env` file in the project root and specify the ports for the frontend and backend (you can reference the provided `env.example` file):

   ```plaintext
   # Backend port
   API_PORT=5001

   # Frontend port
   WEB_PORT=3000
   ```

4. Build and run the containers:

   ```bash
   docker-compose up
   ```

5. The application will be accessible at [http://localhost:3000](http://localhost:3000) and the backend API documentation at [http://localhost:5001/docs/](http://localhost:5001/docs/). If you have chosen different ports in the .env file, make sure to replace 3000 and 5001 with the corresponding values.

### Locally

1. Clone the repository and navigate to the root directory:

   ```bash
   git clone https://github.com/delucajuan/pokemon-battle.git
   cd pokemon-battle
   ```

2. Create a `.env` file in both the `/api` and `/web` directories and specify the required environment variables (you can reference the provided `env.example` files):

   #### In the `/api` directory:

   Create a `.env` file and specify the port for the backend:

   ```plaintext
   PORT=5001
   ```

   #### In the `/web` directory:

   Create a `.env` file and set the API URL:

   ```plaintext
   REACT_APP_API_URL=http://localhost:5001/api
   ```

3. From the root directory, install dependencies for both the frontend and backend:

   ```bash
   npm run install:all
   ```

4. From the root directory, start both the web and API servers (migrations will be executed automatically when the API server starts):

   ```bash
   npm start
   ```

5. The application will be accessible at [http://localhost:3000](http://localhost:3000) and the backend API documentation at [http://localhost:5001/docs/](http://localhost:5001/docs/). If you have chosen different ports, make sure to replace 3000 and 5001 with the corresponding values.

## Author

Developed by [Juan De Luca](https://github.com/delucajuan).
