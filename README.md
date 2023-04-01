# Uenroll <!-- omit in toc -->

Work in progress

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Architecture](#architecture)
- [Development](#development)
  - [Fresh Installation](#fresh-installation)
  - [Database Migration](#database-migration)

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

For development, we will use nginx to serve as the reverse proxy for the server and portal. It will be hosted on http://localhost:8080/.

Both server and portal will be automatically hot-reloaded when there is any code change. NO RESTART IS REQUIRED.

### Fresh Installation

On the root directory, run the following command

```bash
# Create configuration files
make setup

# Install dependencies to show syntax highlighting
npm install

# Run necessary Docker containers
docker compose up -d

# Run database migrations
make migratedb
```

After running the above commands, you should be abled to see the login page via http://localhost:8080/.

### Database Migration

- Create new migration

  ```bash
  make new-migration name=example_name
  ```

- Sync up migrations

  ```bash
  make migratedb
  ```

- Reset migrations

  ```bash
  make resetdb
  ```
