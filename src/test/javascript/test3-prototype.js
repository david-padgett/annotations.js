// test3-prototype.js

try {
	$$test.message("test3-prototype", "Method Annotation - prototype");

	// Used for tests 3-5.

	$MethodAnnotation();
	function PublicMethod() {
	}

	$DefineAnnotation(PublicMethod);

	$MethodAnnotation();
	function StaticMethod() {
	}

	$DefineAnnotation(StaticMethod);

	$MethodAnnotation();
	function FinalMethod() {
	}

	$DefineAnnotation(FinalMethod);

	$$test.assert("No pending annotations", function() {return unboundAnnotationsSize() == 0});

	$DescriptiveType("Prototype");

	$$test.assert("1 pending annotations", function() {return unboundAnnotationsSize() == 1});

	$RESTfulMethod();
	function Prototype() {
	}

	$$test.assert("Class is not annotated", function() {return __Annotations.getFrameworkState(Prototype) == null});
	$$test.assert("2 pending annotations", function() {return unboundAnnotationsSize() == 2});

	$Annotate(Prototype);

	$$test.assert("Class is annotated", function() {return __Annotations.getFrameworkState(Prototype) != null});
	$$test.assert("Class has correct number of annotations", function() {return __Annotations.getFrameworkState(Prototype).annotations.length == 1});
	$$test.assert("Class has correct 1st annotation", function() {return __Annotations.getFrameworkState(Prototype).annotations[0].constructor == DescriptiveType});
	$$test.assert("No pending annotations", function() {return unboundAnnotationsSize() == 0});

	Prototype.prototype.operation0 = function prototypeNotAnnotated() {
	};

	$$test.assert("Operation0 is not initialized", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation0) == null});

	$PublicMethod();

	$$test.assert("Operation0 is initialized but has no attached annotations", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation0).annotations.length == 0});

	Prototype.prototype.operation1 = function() {
	};

	$$test.assert("Operation1 is not initialized", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation1) == null});

	$StaticMethod(); $FinalMethod();

	$$test.assert("Operation1 is initialized and has annotations", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation1).annotations.length > 0});
	$$test.assert("Operation1 is initialized and has correct # of annotations", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation1).annotations.length == 1});
	$$test.assert("Operation1 is initialized and has correct 1st annotation", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation1).annotations[0].constructor == PublicMethod});

	Prototype.prototype.operation2 = function() {
	}

	$$test.assert("Operation2 is not initialized", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation2) == null});
	$$test.assert("2 pending annotations", function() {return unboundAnnotationsSize(Prototype.prototype) == 2});

	$BindAnnotations();

	$$test.assert("Operation2 is initialized and has annotations", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation2).annotations.length > 0});
	$$test.assert("Operation2 is initialized and has correct # of annotations", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation2).annotations.length == 2});
	$$test.assert("Operation2 is initialized and has correct 1st annotation", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation2).annotations[0].constructor == StaticMethod});
	$$test.assert("Operation2 is initialized and has correct 2nd annotation", function() {return __Annotations.getFrameworkState(Prototype.prototype.operation2).annotations[1].constructor == FinalMethod});
}
catch (e) {
	$$test.error(e);
}
