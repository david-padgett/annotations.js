// annotations.js/src/test/javascript/test1-annotate.js

// Part 1
$$test.message("test1-annotate", "DescriptiveType: Positive - define type annotation with single system annotation");
$$test.assertTrue("DescriptiveType: 0 non-system annotations defined", function() {return boundAnnotations(0);});
$$test.assertTrue("DescriptiveType: 0 unbound annotations", function() {return unboundAnnotations(0);});

$TypeAnnotation();

$$test.assertTrue("DescriptiveType: 1 unbound annotation", function() {return unboundAnnotations(1);});
$$test.assertTrue("DescriptiveType: unbound annotation is TypeAnnotation", function() {return getUnboundAnnotations()[0].constructor.name == "TypeAnnotation";});

function DescriptiveType(description) {
	this.description = description;
}

$$test.assertTrue("DescriptiveType: annotation is not in global namespace", function() {return global.$DescriptiveType == null;});

$Annotate(DescriptiveType);
$$test.assertTrue("DescriptiveType: 1 non-system Annotations defined", function() {return boundAnnotations(1);});
$$test.assertTrue("DescriptiveType: 0 unbound annotations", function() {return unboundAnnotations(0);});
$$test.assertTrue("DescriptiveType: annotation is defined in global namespace", function() {return global.$DescriptiveType != null;});
$$test.assertTrue("DescriptiveType: annotation is a Function in global namespace", function() {return global.$DescriptiveType.constructor == Function;});
$$test.assertTrue("DescriptiveType: annotation is annotated", function() {return getFrameworkState(DescriptiveType).annotations.length > 0;});
$$test.assertTrue("DescriptiveType: annotation has TypeAnnotation annotation", function() {return getFrameworkState(DescriptiveType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation;});
$$test.assertTrue("DescriptiveType: annotation is the correct Function in global namespace", function() {return $DescriptiveType.name == "__DefinedAnnotationeHandler";});
$$test.assertTrue("DescriptiveType: annotation type has correct state - " + getFrameworkState(DescriptiveType).name + " == DescriptiveType", function() {return getFrameworkState(DescriptiveType).name == "$DescriptiveType";});

// Attempt to create an annotation type that has already been defined.

$TypeAnnotation();

$$test.assertError("DescriptiveType: attempt to define for a second time", function() {
	$Annotate(DescriptiveType);
});

// Part 2
$$test.message("test1-annotate", "RESTfulType: Positive - define type annotation with single system annotation");

$TypeAnnotation();
function RESTfulType() {
}

$Annotate(RESTfulType);

$$test.assertTrue("RESTfulType: 2 non-system Annotations defined", function() {return boundAnnotations(2);});
$$test.assertTrue("RESTfulType: 0 unbound annotations", function() {return unboundAnnotations(0);});
$$test.assertTrue("RESTfulType: annotation is defined in global namespace", function() {return global.$RESTfulType != null;});
$$test.assertTrue("RESTfulType: annotation is a Function in global namespace", function() {return global.$RESTfulType.constructor == Function;});
$$test.assertTrue("RESTfulType: annotation is annotated", function() {return getFrameworkState(RESTfulType).annotations.length > 0;});
$$test.assertTrue("RESTfulType: annotation has TypeAnnotation annotation", function() {return getFrameworkState(RESTfulType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation;});
$$test.assertTrue("RESTfulType: annotation is the correct Function in global namespace", function() {return $RESTfulType.name == "__DefinedAnnotationeHandler";});
$$test.assertTrue("RESTfulType: annotation type has correct state - " + getFrameworkState(RESTfulType).name + " == RESTfulType", function() {return getFrameworkState(RESTfulType).name == "$RESTfulType";});

// Part 3
$$test.message("test1-annotate", "HtmlType: Positive - define type annotation with single system annotation");

$TypeAnnotation();
function HtmlType() {
}

$Annotate(HtmlType);

$$test.assertTrue("HtmlType: 3 non-system Annotations defined", function() {return boundAnnotations(3);});
$$test.assertTrue("HtmlType: annotation has 1 annotation", function() {return getFrameworkState(HtmlType).annotations.length == 1;});
$$test.assertTrue("HtmlType: annotation has TypeAnnotation annotation", function() {return getFrameworkState(HtmlType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation;});

// Part 4
$$test.message("test1-annotate", "RESTfulMethod: Positive - define method annotation with single system annotation");

$MethodAnnotation();
function RESTfulMethod() {
}

$Annotate(RESTfulMethod);

$$test.assertTrue("RESTfulMethod: 4 non-system Annotations defined", function() {return boundAnnotations(4);});
$$test.assertTrue("RESTfulMethod: annotation has MethodAnnotation annotation", function() {return getFrameworkState(RESTfulMethod).annotations[0].constructor == $$af.systemAnnotationTypes.MethodAnnotation;});

// Part 5
$$test.message("test1-annotate", "UserDefinedPrefixType: Positive - define type annotation with single system annotation, prefix is 'zz'");

$TypeAnnotation(); $Pragma("AnnotationsPrefix", "zz");
function UserDefinedPrefixType() {
}

$Annotate(UserDefinedPrefixType);
$Pragma();

$$test.assertTrue("UserDefinedPrefixType: annotation is defined in global namespace with correct prefix", function() {return global.zzUserDefinedPrefixType != null;});
$$test.assertTrue("UserDefinedPrefixType: 5 non-system Annotations defined", function() {return boundAnnotations(5);});
$$test.assertTrue("UserDefinedPrefixType: annotation has 1 annotations", function() {return getFrameworkState(UserDefinedPrefixType).annotations.length == 1;});
$$test.assertTrue("UserDefinedPrefixType: annotation has TypeAnnotation annotation", function() {return getFrameworkState(UserDefinedPrefixType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation;});

// Part 6
$$test.message("test1-annotate", "NotAnAnnotation: Negative - define type annotation with single non-system annotation");

$DescriptiveType("non system annotation type");
function NotAnAnnotation() {
}

$Annotate(NotAnAnnotation);

$$test.assertTrue("NotAnAnnotation: 5 non-system Annotations defined", function() {return boundAnnotations(5);});
$$test.assertTrue("NotAnAnnotation: annotation is not defined in global namespace", function() {return global.$NotAnAnnotation == null;});
$$test.assertTrue("NotAnAnnotation: function is not annotated", function() {return getFrameworkState(NoAnnotationsAnnotatedType) == null;});
$$test.assertTrue("NotAnAnnotation: function constructor is annotated", function() {return getFrameworkState(NoAnnotationsAnnotatedType.constructor) == null;});

// Part 7
$$test.message("test1-annotate", "NoAnnotationsAnnotatedType: Negative - define type annotation with no system annotations");
$$test.assertTrue("NoAnnotationsAnnotatedType: 0 unbound annotations", function() {return unboundAnnotations(0);});

function NoAnnotationsAnnotatedType() {
}

$$test.assertTrue("NoAnnotationsAnnotatedType: annotation is not defined in global namespace", function() {return global.$NoAnnotationsAnnotatedType == null;});

$Annotate(NoAnnotationsAnnotatedType);

$$test.assertTrue("NoAnnotationsAnnotatedType: 0 unbound annotations", function() {return unboundAnnotations(0);});
$$test.assertTrue("NoAnnotationsAnnotatedType: annotation is not in global namespace", function() {return global.$NoAnnotationsAnnotatedType == null;});
$$test.assertTrue("NoAnnotationsAnnotatedType: annotation is not annotated", function() {return getFrameworkState(NoAnnotationsAnnotatedType) != null;});

// Part 8
$$test.message("test1-annotate", "SchizophrenicType: Negative - define type annotation with two system annotations");
$$test.assertTrue("SchizophrenicType: 0 unbound annotations", function() {return unboundAnnotations(0);});

$TypeAnnotation(); $MethodAnnotation();
function SchizophrenicType() {
}

$$test.assertTrue("SchizophrenicType: two unbound annotations", function() {return unboundAnnotations(2);});
$Annotate(SchizophrenicType);

$$test.assertTrue("SchizophrenicType: annotation is defined in global namespace", function() {return global.$SchizophrenicType != null;});
// $$test.assertTrue("SchizophrenicType: annotation is annotated", function() {return getFrameworkState(SchizophrenicType) != null;});
//
// $$test.assertTrue("SchizophrenicType: annotation has 2 annotations", function() {return getFrameworkState(SchizophrenicType).annotations.length == 2;});
// $$test.assertTrue("SchizophrenicType: annotation has TypeAnnotation annotation", function() {return getFrameworkState(SchizophrenicType).annotations[0].constructor == $$af.systemAnnotationTypes.TypeAnnotation;});
// $$test.assertTrue("SchizophrenicType: annotation has MethodAnnotation annotation", function() {return getFrameworkState(SchizophrenicType).annotations[1].constructor == $$af.systemAnnotationTypes.MethodAnnotation;});
