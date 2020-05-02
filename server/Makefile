.PHONY: deploy start test

ENVIRONMENT ?= development

start: node_modules
	@echo "Starting in stage '$(ENVIRONMENT)'"
	ENVIRONMENT=$(ENVIRONMENT) NODE_ENV=$(ENVIRONMENT) npx serverless offline --stage $(ENVIRONMENT)

test: node_modules
	npx jest --watchAll

deploy: node_modules
	ENVIRONMENT=$(ENVIRONMENT) NODE_ENV=$(ENVIRONMENT) ./bin/deploy

node_modules: yarn.lock
	yarn install
	touch node_modules
