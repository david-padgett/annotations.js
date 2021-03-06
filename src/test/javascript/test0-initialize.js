// annotations.js/src/test/javascript/test0-initialize.js

var __APP_PREFIX = "$" + $$af.constructor.name;
var systemAnnotations = Object.keys($$af.__systemAnnotations).length;

function getUnboundAnnotations() {
	return ($$af.__unboundAnnotations);
}

function boundAnnotations(size) {
	return (systemAnnotations + size == $$af.getAnnotationTypes().length);
}

function unboundAnnotations(size) {
	return (size == getUnboundAnnotations().length);
}

function getFrameworkState(object) {
	return (object[__APP_PREFIX]);
}
