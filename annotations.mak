SED_SLC_REGEX="/\/\//d"
SED_MLC_REGEX="/\/\*\*/,/\*\//d"

SED_ARGS=$(if grep -c 'Darwin',-i "",-i)

dist/annotations.js : src/main/javascript/annotations.js
	@echo Building $@
	@mkdir -p dist
	@cat $+ > $@
	@sed $(SED_ARGS) $(SED_SLC_REGEX) $@
	@sed $(SED_ARGS) $(SED_MLC_REGEX) $@

dist/annotations-node.js : src/main/javascript/annotations-node-prefix.js src/main/javascript/annotations.js src/main/javascript/annotations-node-suffix.js
	@echo Building $@
	@mkdir -p dist
	@cat $+ > $@
	@sed $(SED_ARGS) $(SED_SLC_REGEX) $@
	@sed $(SED_ARGS) $(SED_MLC_REGEX) $@

dist/annotations-node-tests.js : src/test/javascript/node-prefix.js src/test/javascript/test1-annotate.js src/test/javascript/test2-type.js src/test/javascript/test3-prototype.js src/test/javascript/test4-internal.js src/test/javascript/test5-literal.js src/test/javascript/node-suffix.js
	@echo Building $@
	@mkdir -p dist
	@cat $+ > $@
	@sed $(SED_ARGS) $(SED_SLC_REGEX) $@
	@sed $(SED_ARGS) $(SED_MLC_REGEX) $@

all: dist/annotations.js dist/annotations-node.js dist/annotations-node-tests.js node_modules/fn-test

node_modules/fn-test :
	@echo Installing $@
	@npm install git://github.com/david-padgett/fn-test.js.git

test: all
	@echo Running unit tests
	@node dist/annotations-node-tests.js
