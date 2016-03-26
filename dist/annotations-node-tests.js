
var $$test = new (require("fn-test.js"))();

var $$af = new (require("./annotations-node.js"))(global, "$");

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

$$test.message("test1-annotate", "DescriptiveType: Positive - define type annotation with single system annotation");
$$test.positive("DescriptiveType: 0 non-system annotations defined", function() {return boundAnnotations(0)});
$$test.positive("DescriptiveType: 0 unbound annotations", function() {return unboundAnnotations(0)});

$TypeAnnotation();

$$test.positive("DescriptiveType: 1 unbound annotation", function() {return unboundAnnotations(1)});
$$test.positive("DescriptiveType: unbound annotation is TypeAnnotation", function() {return getUnboundAnnotations()[0].constructor.name == "TypeAnnotation"});

function DescriptiveType(description) {
	this.description = description;
}

$$test.positive("DescriptiveType: annotation is not in global namespace", function() {return this.$DescriptiveType == null});

$Annotate(DescriptiveType);
$$test.positive("DescriptiveType: 1 non-system Annotations defined", function() {return boundAnnotations(1)});
$$test.positive("DescriptiveType: 0 unbound annotations", function() {return unboundAnnotations(0)});
$$test.positive("DescriptiveType: annotation is defined in global namespace", function() {return this.$DescriptiveType != null});
$$test.positive("DescriptiveType: annotation is a Function in global namespace", function() {return this.$DescriptiveType.constructor == Function});
$$test.positive("DescriptiveType: annotation is annotated", function() {return $$af.getFrameworkState(DescriptiveType).annotations.length > 0});
$$test.positive("DescriptiveType: annotation has TypeAnnotation annotation", function() {return $$af.getFrameworkState(DescriptiveType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation});
$$test.positive("DescriptiveType: annotation is the correct Function in global namespace", function() {return $DescriptiveType.name == "__DefinedAnnotationeHandler"});
$$test.positive("DescriptiveType: annotation type has correct state - " + $$af.getFrameworkState(DescriptiveType).name + " == DescriptiveType", function() {return $$af.getFrameworkState(DescriptiveType).name == "$DescriptiveType"});


$TypeAnnotation();

$$test.error("DescriptiveType: attempt to define for a second time", function() {
	$Annotate(DescriptiveType);
});

$$test.message("test1-annotate", "RESTfulType: Positive - define type annotation with single system annotation");

$TypeAnnotation();
function RESTfulType() {
}

$Annotate(RESTfulType);

$$test.positive("RESTfulType: 2 non-system Annotations defined", function() {return boundAnnotations(2)});
$$test.positive("RESTfulType: 0 unbound annotations", function() {return unboundAnnotations(0)});
$$test.positive("RESTfulType: annotation is defined in global namespace", function() {return this.$RESTfulType != null});
$$test.positive("RESTfulType: annotation is a Function in global namespace", function() {return this.$RESTfulType.constructor == Function});
$$test.positive("RESTfulType: annotation is annotated", function() {return $$af.getFrameworkState(RESTfulType).annotations.length > 0});
$$test.positive("RESTfulType: annotation has TypeAnnotation annotation", function() {return $$af.getFrameworkState(RESTfulType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation});
$$test.positive("RESTfulType: annotation is the correct Function in global namespace", function() {return $RESTfulType.name == "__DefinedAnnotationeHandler"});
$$test.positive("RESTfulType: annotation type has correct state - " + $$af.getFrameworkState(RESTfulType).name + " == RESTfulType", function() {return $$af.getFrameworkState(RESTfulType).name == "$RESTfulType"});

$$test.message("test1-annotate", "HtmlType: Positive - define type annotation with single system annotation");

$TypeAnnotation();
function HtmlType() {
}

$Annotate(HtmlType);

$$test.positive("HtmlType: 3 non-system Annotations defined", function() {return boundAnnotations(3)});
$$test.positive("HtmlType: annotation has 1 annotation", function() {return $$af.getFrameworkState(HtmlType).annotations.length == 1});
$$test.positive("HtmlType: annotation has TypeAnnotation annotation", function() {return $$af.getFrameworkState(HtmlType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation});

$$test.message("test1-annotate", "RESTfulMethod: Positive - define method annotation with single system annotation");

$MethodAnnotation();
function RESTfulMethod() {
}

$Annotate(RESTfulMethod);

$$test.positive("RESTfulMethod: 4 non-system Annotations defined", function() {return boundAnnotations(4)});
$$test.positive("RESTfulMethod: annotation has MethodAnnotation annotation", function() {return $$af.getFrameworkState(RESTfulMethod).annotations[0].constructor == $$af.systemAnnotationTypes.MethodAnnotation});

$$test.message("test1-annotate", "UserDefinedPrefixType: Positive - define type annotation with single system annotation, prefix is 'zz'");

$TypeAnnotation(); $Pragma("AnnotationsPrefix", "zz");
function UserDefinedPrefixType() {
}

$Annotate(UserDefinedPrefixType);
$Pragma();

$$test.positive("UserDefinedPrefixType: annotation is defined in global namespace with correct prefix", function() {return this.zzUserDefinedPrefixType != null});
$$test.positive("UserDefinedPrefixType: 5 non-system Annotations defined", function() {return boundAnnotations(5)});
$$test.positive("UserDefinedPrefixType: annotation has 1 annotations", function() {return $$af.getFrameworkState(UserDefinedPrefixType).annotations.length == 1});
$$test.positive("UserDefinedPrefixType: annotation has TypeAnnotation annotation", function() {return $$af.getFrameworkState(UserDefinedPrefixType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation});

$$test.message("test1-annotate", "NotAnAnnotation: Negative - define type annotation with single non-system annotation");

$DescriptiveType("non system annotation type");
function NotAnAnnotation() {
}

$Annotate(NotAnAnnotation);

$$test.positive("NotAnAnnotation: 5 non-system Annotations defined", function() {return boundAnnotations(5)});
$$test.positive("NotAnAnnotation: annotation is not defined in global namespace", function() {return this.$NotAnAnnotation == null});
$$test.positive("NotAnAnnotation: function is not annotated", function() {return $$af.getFrameworkState(NoAnnotationsAnnotatedType) == null});
$$test.positive("NotAnAnnotation: function constructor is annotated", function() {return $$af.getFrameworkState(NoAnnotationsAnnotatedType.constructor) == null});

$$test.message("test1-annotate", "NoAnnotationsAnnotatedType: Negative - define type annotation with no system annotations");
$$test.positive("NoAnnotationsAnnotatedType: 0 unbound annotations", function() {return unboundAnnotations(0)});

function NoAnnotationsAnnotatedType() {
}

$$test.positive("NoAnnotationsAnnotatedType: annotation is not defined in global namespace", function() {return this.$NoAnnotationsAnnotatedType == null});

$Annotate(NoAnnotationsAnnotatedType);

$$test.positive("NoAnnotationsAnnotatedType: 0 unbound annotations", function() {return unboundAnnotations(0)});
$$test.positive("NoAnnotationsAnnotatedType: annotation is not in global namespace", function() {return this.$NoAnnotationsAnnotatedType == null});
$$test.positive("NoAnnotationsAnnotatedType: annotation is not annotated", function() {return $$af.getFrameworkState(NoAnnotationsAnnotatedType) != null});

$$test.message("test1-annotate", "SchizophrenicType: Negative - define type annotation with two system annotations");
$$test.positive("SchizophrenicType: 0 unbound annotations", function() {return unboundAnnotations(0)});

$TypeAnnotation(); $MethodAnnotation();
function SchizophrenicType() {
}

$$test.positive("SchizophrenicType: two unbound annotations", function() {return unboundAnnotations(2)});
$Annotate(SchizophrenicType);

$$test.positive("SchizophrenicType: annotation is defined in global namespace", function() {return this.$SchizophrenicType != null});


$$test.message("test2-type", "AnnotatedType: Define Annotated type");

$$test.positive("AnnotatedType: 0 unbound annotations", function() {return unboundAnnotations(0)});

var description = "This test confirms that annotations are added to a class.";
$DescriptiveType(description); $RESTfulType(); $HtmlType();
function AnnotatedType() {
}

$$test.positive("AnnotatedType: type is not annotated", function() {return $$af.getFrameworkState(AnnotatedType) == null});
$$test.positive("AnnotatedType: 3 unbound annotations", function() {return unboundAnnotations(3)});

$Annotate(AnnotatedType);

$$test.positive("AnnotatedType: type is annotated", function() {return $$af.getFrameworkState(AnnotatedType) != null});
$$test.positive("AnnotatedType: type has correct number of annotations", function() {return $$af.getFrameworkState(AnnotatedType).annotations.length == 3});
$$test.positive("AnnotatedType: type has correct 1st annotation", function() {return $$af.getFrameworkState(AnnotatedType).annotations[0].constructor == DescriptiveType});
$$test.positive("AnnotatedType: type has correct 2nd annotation", function() {return $$af.getFrameworkState(AnnotatedType).annotations[1].constructor == RESTfulType});
$$test.positive("AnnotatedType: type has correct 3rd annotation", function() {return $$af.getFrameworkState(AnnotatedType).annotations[2].constructor == HtmlType});

$$test.message("test2-type", "NonAnnotatedType: Attempt to define Annotated Type with system Annotation");
$$test.positive("NonAnnotatedType: 0 unbound annotations", function() {return unboundAnnotations(0)});



$$test.message("test3-prototype", "Prototype: Annotate type and methods via the prototype");


$MethodAnnotation();
function PublicMethod() {
}

$Annotate(PublicMethod);

$MethodAnnotation();
function StaticMethod() {
}

$Annotate(StaticMethod);

$MethodAnnotation();
function FinalMethod() {
}

$Annotate(FinalMethod);

$$test.positive("Prototype: no pending annotations", function() {return unboundAnnotations(0)});

$DescriptiveType("Prototype");

$$test.positive("Prototype: 1 pending annotations", function() {return unboundAnnotations(1)});

$RESTfulType();
function Prototype() {
}

$$test.positive("Prototype: type is not annotated", function() {return $$af.getFrameworkState(Prototype) == null});
$$test.positive("Prototype: 2 pending annotations", function() {return unboundAnnotations(2)});

$Annotate(Prototype);

$$test.positive("Prototype: type is annotated", function() {return $$af.getFrameworkState(Prototype) != null});
$$test.positive("Prototype: type has correct number of annotations", function() {return $$af.getFrameworkState(Prototype).annotations.length == 2});
$$test.positive("Prototype: type has correct 1st annotation", function() {return $$af.getFrameworkState(Prototype).annotations[0].constructor == DescriptiveType});
$$test.positive("Prototype: type has correct 1st annotation", function() {return $$af.getFrameworkState(Prototype).annotations[1].constructor == RESTfulType});
$$test.positive("Prototype: no pending annotations", function() {return unboundAnnotations(0)});

Prototype.prototype.operation0 = function prototypeNotAnnotated() {
};

$$test.positive("Prototype: operation0 is not initialized", function() {return $$af.getFrameworkState(Prototype.prototype.operation0) == null});

$PublicMethod();

$$test.positive("Prototype: operation0 is annotated", function() {return $$af.getFrameworkState(Prototype.prototype.operation0) != null});
$$test.positive("Prototype: operation0 has correct number of annotations", function() {return $$af.getFrameworkState(Prototype.prototype.operation0).annotations.length == 0});

Prototype.prototype.operation1 = function() {
};

$$test.positive("Prototype: operation1 is not initialized", function() {return $$af.getFrameworkState(Prototype.prototype.operation1) == null});

$StaticMethod(); $FinalMethod();

$$test.positive("Prototype: operation1 is initialized and has annotations", function() {return $$af.getFrameworkState(Prototype.prototype.operation1).annotations.length > 0});
$$test.positive("Prototype: operation1 is initialized and has correct # of annotations", function() {return $$af.getFrameworkState(Prototype.prototype.operation1).annotations.length == 1});
$$test.positive("Prototype: operation1 is initialized and has correct 1st annotation", function() {return $$af.getFrameworkState(Prototype.prototype.operation1).annotations[0].constructor == PublicMethod});

Prototype.prototype.operation2 = function() {
}

$$test.positive("Prototype: operation2 is not initialized", function() {return $$af.getFrameworkState(Prototype.prototype.operation2) == null});

$$test.positive("Prototype: 2 pending annotations", function() {return unboundAnnotations(2)});

$DescriptiveType("InternalMethod");

$$test.positive("Prototype: operation2 is initialized and has annotations", function() {return $$af.getFrameworkState(Prototype.prototype.operation2).annotations.length > 0});
$$test.positive("Prototype: operation2 is initialized and has correct # of annotations", function() {return $$af.getFrameworkState(Prototype.prototype.operation2).annotations.length == 2});
$$test.positive("Prototype: operation2 is initialized and has correct 1st annotation", function() {return $$af.getFrameworkState(Prototype.prototype.operation2).annotations[0].constructor == StaticMethod});
$$test.positive("Prototype: operation2 is initialized and has correct 2nd annotation", function() {return $$af.getFrameworkState(Prototype.prototype.operation2).annotations[1].constructor == FinalMethod});


$$test.message("test4-internal", "InternalMethod: Annotate type and methods declared within constructor");


$$test.positive("InternalMethod: 1 pending annotations", function() {return unboundAnnotations(1)});

function InternalMethod() {
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

$$test.message("test5-literal", "ObjectLiteral: Annotate object and methods declared within object");

$$test.positive("ObjectLiteral: no pending annotations", function() {return unboundAnnotations(0)});

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

$$test.positive("ObjectLiteral: operation0 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation0) == null});
$$test.positive("ObjectLiteral: operation1 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation1) == null});
$$test.positive("ObjectLiteral: operation2 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation2) == null});

$Annotate(ObjectLiteral);

$$test.positive("ObjectLiteral: no pending annotations", function() {return unboundAnnotations(0)});
$$test.positive("ObjectLiteral: type is annotated", function() {return $$af.getFrameworkState(ObjectLiteral) != null});
$$test.positive("ObjectLiteral: operation0 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation0) == null});
$$test.positive("ObjectLiteral: operation1 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation1) == null});
$$test.positive("ObjectLiteral: operation2 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation2) == null});

$Annotate(ObjectLiteral.operation1, $PublicMethod());

$$test.positive("ObjectLiteral: operation1 has correct number of annotations", function() {return $$af.getFrameworkState(ObjectLiteral.operation1).annotations.length == 1});
$$test.positive("ObjectLiteral: operation1 has correct 1st annotation", function() {return $$af.getFrameworkState(ObjectLiteral.operation1).annotations[0].constructor == PublicMethod});

$Annotate(ObjectLiteral.operation2, $StaticMethod(), $FinalMethod());

$$test.positive("ObjectLiteral: operation2 has correct number of annotations", function() {return $$af.getFrameworkState(ObjectLiteral.operation2).annotations.length == 2});
$$test.positive("ObjectLiteral: operation2 has correct 1st annotation", function() {return $$af.getFrameworkState(ObjectLiteral.operation2).annotations[0].constructor == StaticMethod});
$$test.positive("ObjectLiteral: operation2 has correct 2nd annotation", function() {return $$af.getFrameworkState(ObjectLiteral.operation2).annotations[1].constructor == FinalMethod});


$$test.summary();
process.exit($$test.getResult() ? 0 : 1);
