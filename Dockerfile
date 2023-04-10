FROM node:18.15.0-bullseye-slim

RUN apt-get update && apt-get -y upgrade && apt-get install -y dumb-init && apt-get clean

WORKDIR /app

ENTRYPOINT ["dumb-init"]

COPY server/package.json server/package.json
COPY portal/package.json portal/package.json
COPY package*.json .

RUN npm ci

COPY . .
