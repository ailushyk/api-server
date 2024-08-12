# API

## Overview

This application is designed to be run either locally in a Node.js environment or through Docker. 
It uses a Docker container for the database and utilizes Drizzle as the ORM for database management. 
The application is in active development, and several features are planned for the future.

## Getting Started

### Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Set Up Environment Variables

Before running the application, you need to configure your environment variables.
Create a .env file in the root directory of your project based on the .env.example template:

```shell
cp .env.example .env
```
Edit the .env file to include your specific environment configurations, such as database credentials, API keys,
and any other settings your application requires.

### Running the Application with Docker

You can run the entire application, including the database, with Docker.

```shell
docker compose --profile dev up -d --build
```

This will build and start the application, along with the database, using the configurations defined in the docker-compose.yml file.

### Running the Application Locally

If you prefer to run the application locally, you can do so by following these steps:

#### Start the Database

Start the database using Docker:

```shell
docker compose --profile dev up -d db
```

#### Install dependencies

```shell
pnpm i
```

#### Run the application

```shell
pnpm run dev
```

This will start the application in development mode, using the configurations defined in the .env file.

## Database Migrations

To run database migrations, use the following command:

```shell
pnpm run db:up
```

This will run the migrations and create the necessary tables in the database.

## Features

[TODO:]

## Future Plans

Several features and improvements are planned for future development:

- **CORS**: Implement Cross-Origin Resource Sharing to control resource access.
- **Websockets**: Integrate Websockets for real-time communication.
- **GraphQL**: Add GraphQL support for a more flexible API.
- **Tests**: Write comprehensive tests.
