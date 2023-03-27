.PHONY: setup
setup: init-prisma
	cp .env.example .env
	ln .env server/.env

.PHONY: init-prisma
init-prisma:
	npx prisma generate --schema=./server/prisma/schema.prisma

.PHONY: migratedb
migratedb:
	npx -w server prisma migrate dev

.PHONY: resetdb
resetdb:
	npx -w server prisma migrate reset
