// annotations.js/src/test/javascript/test3-prototype.js


$$test.message("test3-prototype", "Prototype: Annotate type and methods via the prototype");

// Used for tests 3-5.

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

$$test.assertTrue("Prototype: no pending annotations", function() {return unboundAnnotations(0)});

$DescriptiveType("Prototype");

$$test.assertTrue("Prototype: 1 pending annotations", function() {return unboundAnnotations(1)});

$RESTfulType();
function Prototype() {
}

$$test.assertTrue("Prototype: type is not annotated", function() {return getFrameworkState(Prototype) == null});
$$test.assertTrue("Prototype: 2 pending annotations", function() {return unboundAnnotations(2)});

$Annotate(Prototype);

$$test.assertTrue("Prototype: type is annotated", function() {return getFrameworkState(Prototype) != null});
$$test.assertTrue("Prototype: type has correct number of annotations", function() {return getFrameworkState(Prototype).annotations.length == 2});
$$test.assertTrue("Prototype: type has correct 1st annotation", function() {return getFrameworkState(Prototype).annotations[0].constructor == DescriptiveType});
$$test.assertTrue("Prototype: type has correct 1st annotation", function() {return getFrameworkState(Prototype).annotations[1].constructor == RESTfulType});
$$test.assertTrue("Prototype: no pending annotations", function() {return unboundAnnotations(0)});

Prototype.prototype.operation0 = function prototypeNotAnnotated() {
};

$$test.assertTrue("Prototype: operation0 is not initialized", function() {return getFrameworkState(Prototype.prototype.operation0) == null});

$PublicMethod();

$$test.assertTrue("Prototype: operation0 is annotated", function() {return getFrameworkState(Prototype.prototype.operation0) != null});
$$test.assertTrue("Prototype: operation0 has correct number of annotations", function() {return getFrameworkState(Prototype.prototype.operation0).annotations.length == 0});

Prototype.prototype.operation1 = function() {
};

$$test.assertTrue("Prototype: operation1 is not initialized", function() {return getFrameworkState(Prototype.prototype.operation1) == null});

$StaticMethod(); $FinalMethod();

$$test.assertTrue("Prototype: operation1 is initialized and has annotations", function() {return getFrameworkState(Prototype.prototype.operation1).annotations.length > 0});
$$test.assertTrue("Prototype: operation1 is initialized and has correct # of annotations", function() {return getFrameworkState(Prototype.prototype.operation1).annotations.length == 1});
$$test.assertTrue("Prototype: operation1 is initialized and has correct 1st annotation", function() {return getFrameworkState(Prototype.prototype.operation1).annotations[0].constructor == PublicMethod});

Prototype.prototype.operation2 = function() {
}

$$test.assertTrue("Prototype: operation2 is not initialized", function() {return getFrameworkState(Prototype.prototype.operation2) == null});

$$test.assertTrue("Prototype: 2 pending annotations", function() {return unboundAnnotations(2)});

// Note: Annotation used in next test.  Added here to force completion of Prototype.
$DescriptiveType("InternalMethod");

$$test.assertTrue("Prototype: operation2 is initialized and has annotations", function() {return getFrameworkState(Prototype.prototype.operation2).annotations.length > 0});
$$test.assertTrue("Prototype: operation2 is initialized and has correct # of annotations", function() {return getFrameworkState(Prototype.prototype.operation2).annotations.length == 2});
$$test.assertTrue("Prototype: operation2 is initialized and has correct 1st annotation", function() {return getFrameworkState(Prototype.prototype.operation2).annotations[0].constructor == StaticMethod});
$$test.assertTrue("Prototype: operation2 is initialized and has correct 2nd annotation", function() {return getFrameworkState(Prototype.prototype.operation2).annotations[1].constructor == FinalMethod});
