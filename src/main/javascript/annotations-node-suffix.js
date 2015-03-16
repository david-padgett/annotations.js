// Annotations-Node-Suffix.js

__Annotations.addToNamespace = function(name, value) {
	eval(name + " = value");
}

__Annotations.removeFromNamespace = function(name) {
}

module.exports = __Annotations;
