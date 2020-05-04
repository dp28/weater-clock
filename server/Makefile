.PHONY: deploy start test

ENVIRONMENT ?= development

start: node_modules developmentSSL
	@echo "Starting in stage '$(ENVIRONMENT)'"
	ENVIRONMENT=$(ENVIRONMENT) \
		NODE_ENV=$(ENVIRONMENT) \
		npx nodemon \
		--exec "npx serverless offline start --stage $(ENVIRONMENT) --httpsProtocol developmentSSL" \
		-e "js yml json"

test: node_modules
	npx jest --watchAll

deploy: node_modules
	ENVIRONMENT=$(ENVIRONMENT) NODE_ENV=$(ENVIRONMENT) ./bin/deploy

node_modules: yarn.lock
	yarn install
	touch node_modules

developmentSSL:
	echo "Generating self-signed certificates to enable HTTPS"
	mkdir -p developmentSSL
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout developmentSSL/key.pem -out developmentSSL/cert.pem
