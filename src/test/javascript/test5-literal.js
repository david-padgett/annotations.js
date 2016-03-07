// annotations.js/src/test/javascript/test5-literal.js

try {
	$$test.message("test5-literal", "Method Annotation - object literal");
	$$test.assert("No pending annotations", function() {return unboundAnnotationsSize() == 0});

	var ObjectLiteral = {

		operation0: function objectLiteralNotAnnotated() {
		return ("abc");
		},

		operation1: function() {
		return ("def");
		},

		operation2: function() {
		return ("ghi");
		}

	}

	$$test.assert("Method operation0 is not annotated", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation0) == null});
	$$test.assert("Method operation1 is not annotated", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation1) == null});
	$$test.assert("Method operation2 is not annotated", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation2) == null});

	$Annotate(ObjectLiteral);

	$$test.assert("No pending annotations", function() {return unboundAnnotationsSize() == 0});
	$$test.assert("Method operation0 is annotated but empty", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation0).annotations.length == 0});
	$$test.assert("Method operation1 is annotated but empty", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation1).annotations.length == 0});
	$$test.assert("Method operation2 is annotated but empty", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation2).annotations.length == 0});

	$Annotate(ObjectLiteral.operation1, $PublicMethod());

	$$test.assert("Method operation1 has correct number of annotations", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation1).annotations.length == 1});
	$$test.assert("Method operation1 has correct 1st annotation", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation1).annotations[0].constructor == PublicMethod});

	$Annotate(ObjectLiteral.operation2, $StaticMethod(), $FinalMethod());

	$$test.assert("Method operation2 has correct number of annotations", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation2).annotations.length == 2});
	$$test.assert("Method operation2 has correct 1st annotation", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation2).annotations[0].constructor == StaticMethod});
	$$test.assert("Method operation2 has correct 2nd annotation", function() {return __Annotations.getFrameworkState(ObjectLiteral.operation2).annotations[1].constructor == FinalMethod});
}
catch (e) {
	$$test.error(e);
}
