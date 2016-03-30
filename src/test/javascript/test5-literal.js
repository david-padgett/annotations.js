// annotations.js/src/test/javascript/test5-literal.js

$$test.message("test5-literal", "ObjectLiteral: Annotate object and methods declared within object");

$$test.assertTrue("ObjectLiteral: no pending annotations", function() {return unboundAnnotations(0)});

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

$$test.assertTrue("ObjectLiteral: operation0 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation0) == null});
$$test.assertTrue("ObjectLiteral: operation1 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation1) == null});
$$test.assertTrue("ObjectLiteral: operation2 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation2) == null});

$Annotate(ObjectLiteral);

$$test.assertTrue("ObjectLiteral: no pending annotations", function() {return unboundAnnotations(0)});
$$test.assertTrue("ObjectLiteral: type is annotated", function() {return $$af.getFrameworkState(ObjectLiteral) != null});
$$test.assertTrue("ObjectLiteral: operation0 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation0) == null});
$$test.assertTrue("ObjectLiteral: operation1 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation1) == null});
$$test.assertTrue("ObjectLiteral: operation2 is not annotated", function() {return $$af.getFrameworkState(ObjectLiteral.operation2) == null});

$Annotate(ObjectLiteral.operation1, $PublicMethod());

$$test.assertTrue("ObjectLiteral: operation1 has correct number of annotations", function() {return $$af.getFrameworkState(ObjectLiteral.operation1).annotations.length == 1});
$$test.assertTrue("ObjectLiteral: operation1 has correct 1st annotation", function() {return $$af.getFrameworkState(ObjectLiteral.operation1).annotations[0].constructor == PublicMethod});

$Annotate(ObjectLiteral.operation2, $StaticMethod(), $FinalMethod());

$$test.assertTrue("ObjectLiteral: operation2 has correct number of annotations", function() {return $$af.getFrameworkState(ObjectLiteral.operation2).annotations.length == 2});
$$test.assertTrue("ObjectLiteral: operation2 has correct 1st annotation", function() {return $$af.getFrameworkState(ObjectLiteral.operation2).annotations[0].constructor == StaticMethod});
$$test.assertTrue("ObjectLiteral: operation2 has correct 2nd annotation", function() {return $$af.getFrameworkState(ObjectLiteral.operation2).annotations[1].constructor == FinalMethod});

// var AnotherObjectLiteral = $Annotate({
//
// 	operation0: function objectLiteralNotAnnotated() {
// 		return ("abc");
// 	},
//
// 	operation1: $Annotate(function() {
// 		return ("def");
// 	}, $PublicMethod()),
//
// 	operation2: $Annotate(function() {
// 		return ("ghi");
// 	}, $StaticMethod(), $FinalMethod())
//
// }, $DescriptiveType("this is AnotherObjectLiteral"));
//
