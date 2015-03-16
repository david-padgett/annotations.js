// test1-annotate.js

function annotationsSize() {
	return (__Annotations.getAnnotationTypes().length);
}

function unboundAnnotationsSize(construct) {
	var size = 0;
	var unboundAnnotations = construct == null ? __Annotations.UNBOUND_ANNOTATIONS : construct.__Annotations.unboundAnnotations;
	for (var i in unboundAnnotations) {
		++size;
	}
	return (size);
}

try {
	$$test.message("test1-annotate", "DescriptiveType Annotation");
	var prefix = __Annotations.FRAMEWORK_PREFIX;
	var systemAnnotations = 4;
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
	$$test.assert("Annotation type has correct state - " + DescriptiveType[prefix].name + " == DescriptiveType", function() {return DescriptiveType[prefix].name == "$DescriptiveType"});
	$$test.message("test1-annotate", "RESTfulType Annotation");

	$TypeAnnotation();
	function RESTfulType() {
	}

	$DefineAnnotation(RESTfulType);

	$$test.assert("2 non-system Annotations defined", function() {return annotationsSize() == systemAnnotations + 2});
	$$test.message("test1-annotate", "HtmlType Annotation");

	var data = {name: "testName", value: "testValue"};
	$TypeAnnotation(); $ValueAnnotation(data);
	function HtmlType() {
	}

	$DefineAnnotation(HtmlType);

	$$test.assert("3 non-system Annotations defined", function() {return annotationsSize() == systemAnnotations + 3});
	$$test.assert("Annotation has 2 annotations", function() {return __Annotations.getFrameworkState(HtmlType).annotations.length == 2});
	$$test.assert("Annotation has TypeAnnotation annotation", function() {return __Annotations.getFrameworkState(HtmlType).annotations[0].constructor == __Annotations.AnnotationTypes.TypeAnnotation});
	$$test.assert("Annotation has Annotation annotation", function() {return __Annotations.getFrameworkState(HtmlType).annotations[1].constructor == __Annotations.AnnotationTypes.ValueAnnotation});
	$$test.assert("Annotation annotation has correct state", function() {return __Annotations.getFrameworkState(HtmlType).annotations[1].value.name == data.name});
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
