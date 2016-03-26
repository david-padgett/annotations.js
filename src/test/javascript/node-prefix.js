// annotations.js/src/test/javascript/node-prefix.js

var $$test = new (require("fn-test.js"))();
//var $$test = new (require("../../fn-test.js/dist/fn-test-node.js"))();

var $$af = new (require("./annotations-node.js"))(global, "$");
