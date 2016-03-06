#
# The MIT License (MIT)
#
# Copyright (c) 2015 David Padgett/Summit Street, Inc.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# annotations.js/annotations.mak

include $(MAKEFILE_DIR)/javascript_vars.mak

BUILD_DEPENDENCIES=\
	github.com/david-padgett/fn-test.js.git

BUILD_TARGETS=\
	annotations.js \
	annotations-node.js

TEST_TARGETS=\
	annotations-node-tests.js

annotations.js : \
	$(SOURCE_DIR)/main/javascript/annotations.js

annotations-node.js : \
	$(SOURCE_DIR)/main/javascript/annotations-node-prefix.js \
	$(SOURCE_DIR)/main/javascript/annotations.js \
	$(SOURCE_DIR)/main/javascript/annotations-node-suffix.js

annotations-node-tests.js : \
	$(SOURCE_DIR)/test/javascript/node-prefix.js \
	$(SOURCE_DIR)/test/javascript/test1-annotate.js \
	$(SOURCE_DIR)/test/javascript/test2-type.js \
	$(SOURCE_DIR)/test/javascript/test3-prototype.js \
	$(SOURCE_DIR)/test/javascript/test4-internal.js \
	$(SOURCE_DIR)/test/javascript/test5-literal.js \
	$(SOURCE_DIR)/test/javascript/node-suffix.js

include $(MAKEFILE_DIR)/javascript_rules.mak
