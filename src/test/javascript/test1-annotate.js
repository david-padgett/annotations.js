// annotations.js/src/test/javascript/test1-annotate.js

// Part 1
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

// Attempt to create an annotation type that has already been defined.

$TypeAnnotation();

$$test.error("DescriptiveType: attempt to define for a second time", function() {
	$Annotate(DescriptiveType);
});

// Part 2
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

// Part 3
$$test.message("test1-annotate", "HtmlType: Positive - define type annotation with single system annotation");

$TypeAnnotation();
function HtmlType() {
}

$Annotate(HtmlType);

$$test.positive("HtmlType: 3 non-system Annotations defined", function() {return boundAnnotations(3)});
$$test.positive("HtmlType: annotation has 1 annotation", function() {return $$af.getFrameworkState(HtmlType).annotations.length == 1});
$$test.positive("HtmlType: annotation has TypeAnnotation annotation", function() {return $$af.getFrameworkState(HtmlType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation});

// Part 4
$$test.message("test1-annotate", "RESTfulMethod: Positive - define method annotation with single system annotation");

$MethodAnnotation();
function RESTfulMethod() {
}

$Annotate(RESTfulMethod);

$$test.positive("RESTfulMethod: 4 non-system Annotations defined", function() {return boundAnnotations(4)});
$$test.positive("RESTfulMethod: annotation has MethodAnnotation annotation", function() {return $$af.getFrameworkState(RESTfulMethod).annotations[0].constructor == $$af.systemAnnotationTypes.MethodAnnotation});

// Part 5
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

// Part 6
$$test.message("test1-annotate", "NotAnAnnotation: Negative - define type annotation with single non-system annotation");

$DescriptiveType("non system annotation type");
function NotAnAnnotation() {
}

$Annotate(NotAnAnnotation);

$$test.positive("NotAnAnnotation: 5 non-system Annotations defined", function() {return boundAnnotations(5)});
$$test.positive("NotAnAnnotation: annotation is not defined in global namespace", function() {return this.$NotAnAnnotation == null});
$$test.positive("NotAnAnnotation: function is not annotated", function() {return $$af.getFrameworkState(NoAnnotationsAnnotatedType) == null});
$$test.positive("NotAnAnnotation: function constructor is annotated", function() {return $$af.getFrameworkState(NoAnnotationsAnnotatedType.constructor) == null});

// Part 7
$$test.message("test1-annotate", "NoAnnotationsAnnotatedType: Negative - define type annotation with no system annotations");
$$test.positive("NoAnnotationsAnnotatedType: 0 unbound annotations", function() {return unboundAnnotations(0)});

function NoAnnotationsAnnotatedType() {
}

$$test.positive("NoAnnotationsAnnotatedType: annotation is not defined in global namespace", function() {return this.$NoAnnotationsAnnotatedType == null});

$Annotate(NoAnnotationsAnnotatedType);

$$test.positive("NoAnnotationsAnnotatedType: 0 unbound annotations", function() {return unboundAnnotations(0)});
$$test.positive("NoAnnotationsAnnotatedType: annotation is not in global namespace", function() {return this.$NoAnnotationsAnnotatedType == null});
$$test.positive("NoAnnotationsAnnotatedType: annotation is not annotated", function() {return $$af.getFrameworkState(NoAnnotationsAnnotatedType) != null});

// Part 8
$$test.message("test1-annotate", "SchizophrenicType: Negative - define type annotation with two system annotations");
$$test.positive("SchizophrenicType: 0 unbound annotations", function() {return unboundAnnotations(0)});

$TypeAnnotation(); $MethodAnnotation();
function SchizophrenicType() {
}

$$test.positive("SchizophrenicType: two unbound annotations", function() {return unboundAnnotations(2)});
$Annotate(SchizophrenicType);

$$test.positive("SchizophrenicType: annotation is defined in global namespace", function() {return this.$SchizophrenicType != null});
// $$test.positive("SchizophrenicType: annotation is annotated", function() {return $$af.getFrameworkState(SchizophrenicType) != null});
//
// $$test.positive("SchizophrenicType: annotation has 2 annotations", function() {return $$af.getFrameworkState(SchizophrenicType).annotations.length == 2});
// $$test.positive("SchizophrenicType: annotation has TypeAnnotation annotation", function() {return $$af.getFrameworkState(SchizophrenicType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation});
// $$test.positive("SchizophrenicType: annotation has MethodAnnotation annotation", function() {return $$af.getFrameworkState(SchizophrenicType).annotations[1].constructor == $$af.systemAnnotationTypes.MethodAnnotation});
