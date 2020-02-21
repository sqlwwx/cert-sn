LINT = $(PWD)/node_modules/.bin/eslint
FORMATTER = $(shell node -p "require.resolve('eslint-friendly-formatter')")

lint:
	$(LINT) --format $(FORMATTER) --fix ./*.js ./bin/*.js

.PHONY: lint
