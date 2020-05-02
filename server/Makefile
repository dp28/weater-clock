.PHONY: deploy start test

STAGE := dev

start: node_modules
	npx serverless offline

test: node_modules
	npx jest --watchAll

deploy:
	npx serverless deploy --stage $(STAGE)

node_modules: yarn.lock
	yarn install
	touch node_modules
