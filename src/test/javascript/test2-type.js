// test2-type.js

try {
	$$test.message("test2-type", "Type Annotation");

	var description = "This test confirms that annotations are added to a class.";
	$DescriptiveType(description); $RESTfulType(); $HtmlType();
	function AnnotatedType() {
	}

	$$test.assert("Class is not annotated", function() {return __Annotations.getFrameworkState(AnnotatedType) == null});

	$Annotate(AnnotatedType);

	$$test.assert("Class is annotated", function() {return __Annotations.getFrameworkState(AnnotatedType) != null});
	$$test.assert("Class has correct number of annotations", function() {return __Annotations.getFrameworkState(AnnotatedType).annotations.length == 3});
	$$test.assert("Class has correct 1st annotation", function() {return __Annotations.getFrameworkState(AnnotatedType).annotations[0].constructor == DescriptiveType});
	$$test.assert("Class has correct 2nd annotation", function() {return __Annotations.getFrameworkState(AnnotatedType).annotations[1].constructor == RESTfulType});
	$$test.assert("Class has correct 3rd annotation", function() {return __Annotations.getFrameworkState(AnnotatedType).annotations[2].constructor == HtmlType});
}
catch (e) {
	$$test.error(e);
}
