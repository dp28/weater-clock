.PHONY: deploy start remove_stage_from_aws

STAGE := dev

start: node_modules
	npx serverless offline

deploy:
	npx serverless deploy --stage $(STAGE)

node_modules: yarn.lock
	yarn install
	touch node_modules
