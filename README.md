# Uenroll

## Overview

Uenroll is a web-based application which is a course selection system for universities. Users can search, select, and drop courses on the system. Our project aims to create a more convenient and minimalistic system for students to select their courses.

## Prerequisites

This project is using NodeJS 18 and Docker for development usage. Please perform the following steps to align the NodeJS version:

1. Install [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm#intro)

2. Run the following command to install the required NodeJS version in `.nvmrc` file

   ```bash
   nvm use
   ```

3. Install [Docker](https://www.docker.com)

## Architecture

The system consists of:

1. API server serving tRPC procedures
2. Worker (process course enrollment)
3. Portal (React)
4. Redis storing user sessions
5. PostgreSQL serves as database

```
         ┌─────────────┐
         │   Browser   │
         └──────┬──────┘
         ┌──────┴───────┐
         │    Portal    │
         └──────┬───────┘
                │ tRPC
         ┌──────┴───────┐
         │  API server  │
         └───┬──────┬───┘
 ┌───────────┴─┐  ┌─┴───────────┐
 │    Redis    │  │ PostgreSQL  │
 └───────────┬─┘  └─┬───────────┘
         ┌───┴──────┴───┐
         │    Worker    │
         └──────────────┘
```

## Development

### Fresh Installation

On the root directory, run the following command

```bash
# Install dependencies
npm install

# Create configuration files
make setup

# Run necessary Docker containers
docker compose up -d

# Run database migrations
make migratedb
```

### Start server

On the root directory, run the following command

```bash
npm run start:server
```

### Start portal

On the root directory, run the following command

```bash
npm run start:portal
```
