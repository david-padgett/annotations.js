// annotations.js/src/test/javascript/test0-initialize.js

console.log("")

var systemAnnotations = Object.keys($$af.systemAnnotations).length;

function getUnboundAnnotations() {
	return ($$af.unboundAnnotations);
}

function boundAnnotations(size) {
	return (systemAnnotations + size == $$af.getAnnotationTypes().length);
}

function unboundAnnotations(size) {
	return (size == getUnboundAnnotations().length);
}
