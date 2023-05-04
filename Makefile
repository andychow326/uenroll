USE_DOCKER_COMPOSE=docker compose -p uenroll

.PHONY: setup
setup:
	cp .env.example .env

.PHONY: init-prisma
init-prisma:
	npx prisma generate --schema=./server/prisma/schema.prisma

.PHONY: migratedb
migratedb:
	${USE_DOCKER_COMPOSE} exec server bash -c "npx -w server prisma migrate dev"

.PHONY: resetdb
resetdb:
	${USE_DOCKER_COMPOSE} exec server bash -c "npx -w server prisma migrate reset"

.PHONY: new-migration
new-migration:
ifdef name
	${USE_DOCKER_COMPOSE} exec server bash -c "npx -w server prisma migrate dev --create-only --name $(name)"
else
	@echo "Please call with arguments \"name\""
	@echo "Example: make new-migration name=example_1"
endif
