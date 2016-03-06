
var $$test = require("fn-test");
var __Annotations = require("./annotations-node.js");
__Annotations.setNamespace(module);

function annotationsSize() {
	return (__Annotations.getAnnotationTypes().length);
}

function unboundAnnotationsSize(construct) {
	return __Annotations.getUnboundAnnotations(construct).length;
}

var systemAnnotations = 4;

try {
	$$test.expect(86, 0, 0);

	$$test.message("test1-annotate", "DescriptiveType Annotation");
	$$test.assert("No non-system Annotations defined", function() {return annotationsSize() == systemAnnotations});
	$$test.assert("No unbound annotations", function() {return unboundAnnotationsSize() == 0});

	$TypeAnnotation();

	$$test.assert("One unbound annotation", function() {return unboundAnnotationsSize() == 1});

	function DescriptiveType(description) {
		this.description = description;
	}

	$$test.assert("Annotation is not in global namespace", function() {return this.$DescriptiveType == null});

	$DefineAnnotation(DescriptiveType);

	$$test.assert("1 non-system Annotations defined", function() {return annotationsSize() == systemAnnotations + 1});
	$$test.assert("No unbound annotations", function() {return unboundAnnotationsSize() == 0});
	$$test.assert("Annotation is defined in global namespace", function() {return this.$DescriptiveType != null});
	$$test.assert("Annotation is a Function in global namespace", function() {return this.$DescriptiveType.constructor == Function});
	$$test.assert("Annotation is annotated", function() {return __Annotations.getFrameworkState(DescriptiveType).annotations.length > 0});
	$$test.assert("Annotation has TypeAnnotation annotation", function() {return __Annotations.getFrameworkState(DescriptiveType).annotations[0].constructor == __Annotations.AnnotationTypes.TypeAnnotation});
	$$test.assert("Annotation is the correct Function in global namespace", function() {return $DescriptiveType.name == "__AnnotatedTypeConstructor"});
	$$test.assert("Annotation type has correct state - " + __Annotations.getFrameworkState(DescriptiveType).name + " == DescriptiveType", function() {return __Annotations.getFrameworkState(DescriptiveType).name == "$DescriptiveType"});

	$$test.message("test1-annotate", "RESTfulType Annotation");

	$TypeAnnotation();
	function RESTfulType() {
	}

	$DefineAnnotation(RESTfulType);

	$$test.assert("2 non-system Annotations defined", function() {return annotationsSize() == systemAnnotations + 2});
	$$test.assert("No unbound annotations", function() {return unboundAnnotationsSize() == 0});
	$$test.assert("Annotation is defined in global namespace", function() {return this.$RESTfulType != null});
	$$test.assert("Annotation is a Function in global namespace", function() {return this.$RESTfulType.constructor == Function});
	$$test.assert("Annotation is annotated", function() {return __Annotations.getFrameworkState(RESTfulType).annotations.length > 0});
	$$test.assert("Annotation has TypeAnnotation annotation", function() {return __Annotations.getFrameworkState(RESTfulType).annotations[0].constructor == __Annotations.AnnotationTypes.TypeAnnotation});
	$$test.assert("Annotation is the correct Function in global namespace", function() {return $RESTfulType.name == "__AnnotatedTypeConstructor"});
	$$test.assert("Annotation type has correct state - " + __Annotations.getFrameworkState(RESTfulType).name + " == RESTfulType", function() {return __Annotations.getFrameworkState(RESTfulType).name == "$RESTfulType"});

	$$test.message("test1-annotate", "HtmlType Annotation");

	var data = {name: "testName", value: "testValue"};
	$TypeAnnotation(); $ValueAnnotation(data);
	function HtmlType() {
	}

	$DefineAnnotation(HtmlType);

	$$test.assert("3 non-system Annotations defined", function() {return annotationsSize() == systemAnnotations + 3});
	$$test.assert("Annotation has 2 annotations", function() {return __Annotations.getFrameworkState(HtmlType).annotations.length == 2});
	$$test.assert("Annotation has TypeAnnotation annotation", function() {return __Annotations.getFrameworkState(HtmlType).annotations[0].constructor == __Annotations.AnnotationTypes.TypeAnnotation});
	$$test.assert("Annotation has ValueAnnotation annotation", function() {return __Annotations.getFrameworkState(HtmlType).annotations[1].constructor == __Annotations.AnnotationTypes.ValueAnnotation});
	$$test.assert("Annotation type has correct state", function() {return __Annotations.getFrameworkState(HtmlType).annotations[1].value.name == data.name});

	$$test.message("test1-annotate", "RESTfulMethod Annotation");

	$MethodAnnotation();
	function RESTfulMethod() {
	}

	$DefineAnnotation(RESTfulMethod);

	$$test.assert("4 non-system Annotations defined", function() {return annotationsSize() == systemAnnotations + 4});
	$$test.assert("Annotation has MethodAnnotation annotation", function() {return __Annotations.getFrameworkState(RESTfulMethod).annotations[0].constructor == __Annotations.AnnotationTypes.MethodAnnotation});

	$$test.message("test1-annotate", "UserDefinedPrefixType Annotation");

	$TypeAnnotation();
	function UserDefinedPrefixType() {
	}

	$DefineAnnotation(UserDefinedPrefixType, "zz");

	$$test.assert("Annotation is defined in global namespace", function() {return this.zzUserDefinedPrefixType != null}); $$test.assert("4 non-system Annotations defined", function() {return annotationsSize() == systemAnnotations + 5});
	$$test.assert("Annotation has 1 annotations", function() {return __Annotations.getFrameworkState(UserDefinedPrefixType).annotations.length == 1});
	$$test.assert("Annotation has TypeAnnotation annotation", function() {return __Annotations.getFrameworkState(UserDefinedPrefixType).annotations[0].constructor == __Annotations.AnnotationTypes.TypeAnnotation});
}
catch (e) {
	$$test.error(e);
}

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

try {
	$$test.message("test3-prototype", "Method Annotation - prototype");


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

$$test.summary();
