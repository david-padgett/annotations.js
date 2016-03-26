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

// Note: Annotation used in next test.  Added here to force completion of Prototype.
$DescriptiveType("InternalMethod");

$$test.positive("Prototype: operation2 is initialized and has annotations", function() {return $$af.getFrameworkState(Prototype.prototype.operation2).annotations.length > 0});
$$test.positive("Prototype: operation2 is initialized and has correct # of annotations", function() {return $$af.getFrameworkState(Prototype.prototype.operation2).annotations.length == 2});
$$test.positive("Prototype: operation2 is initialized and has correct 1st annotation", function() {return $$af.getFrameworkState(Prototype.prototype.operation2).annotations[0].constructor == StaticMethod});
$$test.positive("Prototype: operation2 is initialized and has correct 2nd annotation", function() {return $$af.getFrameworkState(Prototype.prototype.operation2).annotations[1].constructor == FinalMethod});
