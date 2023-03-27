.PHONY: setup
setup:
	cp .env.example .env
	ln .env server/.env

.PHONY: migratedb
migratedb:
	npx -w server prisma migrate dev

.PHONY: resetdb
resetdb:
	npx -w server prisma migrate reset
