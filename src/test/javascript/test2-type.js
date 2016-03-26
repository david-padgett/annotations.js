// annotations.js/src/test/javascript/test2-type.js


// Part 1
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

// Part 2
$$test.message("test2-type", "NonAnnotatedType: Attempt to define Annotated Type with system Annotation");
$$test.positive("NonAnnotatedType: 0 unbound annotations", function() {return unboundAnnotations(0)});

