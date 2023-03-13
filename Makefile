.PHONY: setup
setup:
	cp .env.example .env
	ln .env server/.env
