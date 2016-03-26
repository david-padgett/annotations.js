// annotations.js/src/test/javascript/test4-internal.js

// Part 1

$$test.message("test4-internal", "InternalMethod: Annotate type and methods declared within constructor");

//$DescriptiveType("InternalMethod");

$$test.positive("InternalMethod: 1 pending annotations", function() {return unboundAnnotations(1)});

function InternalMethod() {
//	$Annotate(this);
	this.value = "foobar";
	this.operation0 = function internalMethodNotAnnotated() {
		return ("abc");
	};
	$PublicMethod(this);
	this.operation1 = function() {
		return ("def");
	};
	$StaticMethod(); $FinalMethod();
	this.operation2 = function() {
		return ("ghi");
	};
}

$$test.positive("InternalMethod: 1 pending annotations", function() {return unboundAnnotations(1)});
$$test.positive("InternalMethod: type is not annotated", function() {return $$af.getFrameworkState(InternalMethod) == null});

$Annotate(InternalMethod);

$$test.positive("InternalMethod: type is annotated", function() {return $$af.getFrameworkState(InternalMethod) != null});
$$test.positive("InternalMethod: type has correct number of annotations", function() {return $$af.getFrameworkState(InternalMethod).annotations.length == 1});
$$test.positive("InternalMethod: type has correct 1st annotation", function() {return $$af.getFrameworkState(InternalMethod).annotations[0].constructor == DescriptiveType});
$$test.positive("InternalMethod: no pending annotations", function() {return unboundAnnotations(0)});

//var object = new InternalMethod();
var object = $CreateAnnotatedInstance(InternalMethod);

$$test.positive("InternalMethod: operation0 is annotated", function() {return $$af.getFrameworkState(object.operation0) != null});
$$test.positive("InternalMethod: operation0 has correct number of annotations", function() {return $$af.getFrameworkState(object.operation0).annotations.length == 0});
$$test.positive("InternalMethod: operation1 is annotated", function() {return $$af.getFrameworkState(object.operation1) != null});
$$test.positive("InternalMethod: operation1 has correct number of annotations", function() {return $$af.getFrameworkState(object.operation1).annotations.length == 1});
$$test.positive("InternalMethod: operation1 has correct 1st annotation", function() {return $$af.getFrameworkState(object.operation1).annotations[0].constructor == PublicMethod});
$$test.positive("InternalMethod: operation2 is annotated", function() {return $$af.getFrameworkState(object.operation2) != null});
$$test.positive("InternalMethod: operation2 has correct number of annotations", function() {return $$af.getFrameworkState(object.operation2).annotations.length == 2});
$$test.positive("InternalMethod: operation2 has correct 1st annotation", function() {return $$af.getFrameworkState(object.operation2).annotations[0].constructor == StaticMethod});
$$test.positive("InternalMethod: operation2 has correct 2nd annotation", function() {return $$af.getFrameworkState(object.operation2).annotations[1].constructor == FinalMethod});
