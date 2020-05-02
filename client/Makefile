.PHONY: start test

STAGE := dev

start: node_modules
	yarn start

test: node_modules
	yarn test

node_modules: yarn.lock
	yarn install
	touch node_modules
