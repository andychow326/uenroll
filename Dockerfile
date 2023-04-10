FROM node:18.15.0-bullseye-slim

WORKDIR /app

COPY server/package.json server/package.json
COPY portal/package.json portal/package.json
COPY package*.json .

RUN npm ci

COPY . .
