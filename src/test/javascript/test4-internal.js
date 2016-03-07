// annotations.js/src/test/javascript/test4-internal.js

try {
	$$test.message("test4-internal", "Method Annotation - internal method");

	$DescriptiveType("InternalMethod");

	$$test.assert("1 pending annotations", function() {return unboundAnnotationsSize() == 1});

	function InternalMethod() {
		$Annotate(this);
		this.operation0 = function internalMethodNotAnnotated() {
		return ("abc");
		};
		$PublicMethod();
		this.operation1 = function() {
		return ("def");
		};
		$StaticMethod(); $FinalMethod();
		this.operation2 = function() {
		return ("ghi");
		};
		$BindAnnotations();
	}

	$$test.assert("1 pending annotations", function() {return unboundAnnotationsSize() == 1});
	$$test.assert("Class is not annotated", function() {return __Annotations.getFrameworkState(InternalMethod) == null});

	$Annotate(InternalMethod);

	$$test.assert("Class is annotated", function() {return __Annotations.getFrameworkState(InternalMethod) != null});
	$$test.assert("Class has correct number of annotations", function() {return __Annotations.getFrameworkState(InternalMethod).annotations.length == 1});
	$$test.assert("Class has correct 1st annotation", function() {return __Annotations.getFrameworkState(InternalMethod).annotations[0].constructor == DescriptiveType});
	$$test.assert("No pending annotations", function() {return unboundAnnotationsSize() == 0});

	var object = new InternalMethod();

	$$test.assert("Method operation0 is annotated", function() {return __Annotations.getFrameworkState(object.operation0) != null});
	$$test.assert("Method operation0 has correct number of annotations", function() {return __Annotations.getFrameworkState(object.operation0).annotations.length == 0});
	$$test.assert("Method operation1 is annotated", function() {return __Annotations.getFrameworkState(object.operation1) != null});
	$$test.assert("Method operation1 has correct number of annotations", function() {return __Annotations.getFrameworkState(object.operation1).annotations.length == 1});
	$$test.assert("Method operation1 has correct 1st annotation", function() {return __Annotations.getFrameworkState(object.operation1).annotations[0].constructor == PublicMethod});
	$$test.assert("Method operation2 is annotated", function() {return __Annotations.getFrameworkState(object.operation2) != null});
	$$test.assert("Method operation2 has correct number of annotations", function() {return __Annotations.getFrameworkState(object.operation2).annotations.length == 2});
	$$test.assert("Method operation2 has correct 1st annotation", function() {return __Annotations.getFrameworkState(object.operation2).annotations[0].constructor == StaticMethod});
	$$test.assert("Method operation2 has correct 2nd annotation", function() {return __Annotations.getFrameworkState(object.operation2).annotations[1].constructor == FinalMethod});
}
catch (e) {
	$$test.error(e);
}
