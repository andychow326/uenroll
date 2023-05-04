USE_DOCKER_COMPOSE=docker compose -p uenroll
USE_DOCKER_COMPOSE_TEST=${USE_DOCKER_COMPOSE} --profile test

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

.PHONY: ensure-test-env-up
ensure-test-env-up:
	${USE_DOCKER_COMPOSE_TEST} up -d test-db test-redis

.PHONY: clean-up-test-env
clean-up-test-env:
	${USE_DOCKER_COMPOSE_TEST} rm -s -v -f test-db test-redis

.PHONY: test-server
test-server: ensure-test-env-up
	${USE_DOCKER_COMPOSE_TEST} run --rm test-server
	$(MAKE) clean-up-test-env
