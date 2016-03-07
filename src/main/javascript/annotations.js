/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 David Padgett/Summit Street, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// annotations.js/src/main/javascript/annotations.js

var __Annotations = {

	FRAMEWORK_PREFIX: "__Annotations",
	NAMESPACE_PREFIX: "$",
	NAMESPACE: this,
	ALIASED_FUNCTIONS: [],
	ANNOTATION_TYPES: {},
	UNBOUND_ANNOTATIONS: [],
	ANNOTATED_CONSTRUCTS: [],
	CONSTRUCT: null,

	AnnotationTypes: {

		// A system level annotation used to identify user-defined annotations
		// that can be bound to methods.

		MethodAnnotation: function MethodAnnotation() {
		},

		// A system level annotation used to identify user-defined annotations
		// that can be bound to objects/type instances.

		ObjectAnnotation: function ObjectAnnotation() {
		},

		// A system level annotation used to identify user-defined annotations
		// that can be bound to types/classes.

		TypeAnnotation: function TypeAnnotation() {
		},

		// A system level, general purpose annotation that stores an arbitrary
		// value.

		ValueAnnotation: function ValueAnnotation(value) {
			this.value = value;
		}

	},

	// Adds the specified construct to the list of all annotated constructs,
	// duplicates and null constructs are ignored.

	addAnnotatedConstruct: function(construct) {
		__Annotations.CONSTRUCT = construct;
		if (construct != null) {
			for (var i = __Annotations.ANNOTATED_CONSTRUCTS.length; i >= 0; --i) {
				var annotatedConstruct = __Annotations.ANNOTATED_CONSTRUCTS[i];
				if (annotatedConstruct == construct || (annotatedConstruct != null && annotatedConstruct.prototype == construct)) {
					return;
				}
			}
			__Annotations.ANNOTATED_CONSTRUCTS.push(construct);
		}
	},

	// Injects the specified annotated types into the unbound annotations cache.
	// This is equivalent to declaring an annotation directly, for example:
	// $TypeAnnotation() or $MethodAnnotation().

	addAnnotations: function AddAnnotations() {
		for (var i = 0; i < arguments.length; ++i) {
			var frameworkState = __Annotations.getFrameworkState(arguments[i]);
			if (frameworkState != null) {
				__Annotations.ANNOTATION_TYPES[frameworkState.name]();
			}
		}
	},

	// Adds the specified object to the current namespace.

	addToNamespace: function(name, value) {
		__Annotations.NAMESPACE[name] = value;
	},

	// Annotates the specified construct with annotations that have been declared
	// but not yet bound to a construct.

	annotate: function Annotate(construct) {

		// If the construct is a method or type, add all unbound annotations it.

		if (construct != null) {
			if (construct.constructor == Function) {
				if (__Annotations.contains(__Annotations.CONSTRUCT, construct)) {
					__Annotations.annotateConstruct(construct, __Annotations.AnnotationTypes.MethodAnnotation, __Annotations.getFrameworkState(__Annotations.CONSTRUCT).unboundAnnotations);
					return;
				}
				__Annotations.annotateConstruct(construct, construct.systemAnnotation ? null : __Annotations.AnnotationTypes.TypeAnnotation, __Annotations.UNBOUND_ANNOTATIONS);
			}
			else {

				// The construct is an object, ensure that it is initialized, then
				// add all unbound annotations to the first uninitialized method.
				// This has the side effect of properly initializing unannotated
				// methods.

				__Annotations.annotateConstruct(construct, __Annotations.AnnotationTypes.ObjectAnnotation, __Annotations.UNBOUND_ANNOTATIONS);
				for (var methodName in construct) {
					var method = construct[methodName];
					if (method.constructor == Function && __Annotations.getFrameworkState(method) == null) {
						__Annotations.annotateConstruct(method, __Annotations.AnnotationTypes.MethodAnnotation, __Annotations.getFrameworkState(construct).unboundAnnotations);
					}
				}
			}

			// Retain a reference to the construct in the event that method level
			// annotations are present.

			__Annotations.addAnnotatedConstruct(construct);
		}
	},

	// Annotates the specified construct.

	annotateConstruct: function(construct, constructType, unboundAnnotations) {

		// Initialize the construct for use by the framework.

		__Annotations.initializeFrameworkState(construct, constructType);

		// Add all compatible unbound annotations to the construct.  The
		// annotation is compatible if it has no annotations itself (e.g.: is not
		// typed) or if it contains an annotation matching the annotation
		// specified by constructType.

		for (unboundAnnotations = unboundAnnotations.reverse(); unboundAnnotations.length != 0;) {
			var annotation = unboundAnnotations.pop();
			if (__Annotations.getFrameworkState(annotation.constructor).annotations.length == 0 || __Annotations.hasAnnotation(annotation.constructor, constructType)) {
				__Annotations.getFrameworkState(construct).annotations.push(annotation);
			}
		}
	},

	// Attaches all unbound annotations to the current or specified construct.

	bindAnnotations: function BindAnnotations(construct) {
		__Annotations.annotate(construct != null ? construct : __Annotations.CONSTRUCT);
	},

	// Determines whether an object contains another object.

	contains: function(object, member) {
		if (object != null && member != null) {
			for (var i in object) {
				if (object[i] == member) {
					return (true);
				}
			}
		}
		return (false);
	},

	// Initialize and register the specified annotation type.

	defineAnnotation: function DefineAnnotation(annotationType, annotationPrefix) {

		if (annotationType == null || annotationType.constructor != Function) {
			throw new Error(__Annotations.FRAMEWORK_PREFIX + ".defineAnnotation(): Annotation type must be a Function.");
		}

		var namespaceName = (annotationPrefix != null ? annotationPrefix : __Annotations.NAMESPACE_PREFIX) + annotationType.name;
		if (__Annotations.ANNOTATION_TYPES[namespaceName] != null) {
			throw new Error(__Annotations.FRAMEWORK_PREFIX + ".defineAnnotation(): Annotation type has already been defined.");
		}

		var annotationTypeConstructor = function __AnnotatedTypeConstructor() {

			// Create a new instance of the annotation.

			var annotation = {};
			annotation.constructor = annotationType;
			annotationType.apply(annotation, arguments);

			// If the new annotation is a MethodAnnotation, attach it to the
			// prototype rather than the type.

			var construct = __Annotations.CONSTRUCT;
			if (construct != null && construct.constructor == Function && __Annotations.hasAnnotation(annotation.constructor, __Annotations.AnnotationTypes.MethodAnnotation)) {
				__Annotations.CONSTRUCT = construct = construct.prototype;
			}

			// Attach all unbound annotations to the construct.

			__Annotations.annotate(construct);

			// If the new annotation is a TypeAnnotation, ensure that the new
			// annotation is placed on the global unbound annotations stack.

			if (__Annotations.hasAnnotation(annotation.constructor, __Annotations.AnnotationTypes.TypeAnnotation) && !__Annotations.hasAnnotation(annotation.constructor, __Annotations.AnnotationTypes.MethodAnnotation)) {
				__Annotations.CONSTRUCT = construct = null;
			}

			// Place the new annotation on the correct unbound annotations stack.

			var unboundAnnotations = construct == null || construct.constructor == Function ? __Annotations.UNBOUND_ANNOTATIONS : __Annotations.getFrameworkState(construct).unboundAnnotations;
			unboundAnnotations.push(annotation);
		};

		// Attach all unbound annotations to the new annotation, then add the
		// factory for the new annotation to the global namespace.

		__Annotations.annotate(annotationType);
		__Annotations.CONSTRUCT = null;
		__Annotations.getFrameworkState(annotationType).name = namespaceName;
		__Annotations.ANNOTATION_TYPES[namespaceName] = annotationTypeConstructor;
		__Annotations.addToNamespace(namespaceName, annotationTypeConstructor);
	},

	// Retrieves the list of all annotated types and objects.

	getAnnotatedConstructs: function GetAnnotatedConstructs() {
		var constructs = [];
		var annotatedTypes = [];
		for (var i = 0; i < arguments.length; ++i) {
			annotatedTypes.push(arguments[i]);
		}
		for (var i = 0; i < __Annotations.ANNOTATED_CONSTRUCTS.length; ++i) {
			var construct = __Annotations.ANNOTATED_CONSTRUCTS[i];
			if (!construct.systemAnnotation) {
				var args = [construct].concat(annotatedTypes);
				if (__Annotations.hasAnnotation.apply(null, args)) {
					constructs.push(construct);
				}
			}
		}
		return (constructs);
	},

	// Returns the set of annotation types managed by the framework.

	getAnnotationTypes: function GetAnnotationTypes() {
		var annotationTypes = [];
		for (var i in __Annotations.ANNOTATION_TYPES) {
			annotationTypes.push(__Annotations.ANNOTATION_TYPES[i]);
		}
		return (annotationTypes);
	},

	// Retrieves the annotations attached to the specified construct.

	getAnnotations: function GetAnnotations(construct) {
		var state = __Annotations.getFrameworkState(construct);
		return (state != null ? state.annotations.slice(0) : null);
	},

	// Retrieve the state attached to the specified construct or null if no
	// construct was provided.

	getFrameworkState: function(construct) {
		return (construct == null ? null : construct[__Annotations.FRAMEWORK_PREFIX]);
	},

	getUnboundAnnotations: function GetUnboundAnnotations(construct) {
		if (construct == null) {
			return (__Annotations.UNBOUND_ANNOTATIONS);
		}
		return (construct.__Annotations.unboundAnnotations);
	},

	// Initializes function aliases defined in the global namespace.

	initializeAliases: function InitializeAliases() {
		for (var i in __Annotations) {
			if (__Annotations[i] != null && __Annotations[i].constructor == Function && __Annotations[i].name != "") {
				var namespaceName = __Annotations.NAMESPACE_PREFIX + __Annotations[i].name;
				__Annotations.addToNamespace(namespaceName, __Annotations[i]);
				__Annotations.ALIASED_FUNCTIONS.push(namespaceName);
			}
		}
	},

	// Initialize the Annotations framework and install function aliases and
	// system annotation types.

	initializeAnnotationsFramework: function InitializeAnnotationsFramework() {
		__Annotations.ALIASED_FUNCTIONS = [];
		__Annotations.ANNOTATION_TYPES = {};
		__Annotations.UNBOUND_ANNOTATIONS = [];
		__Annotations.ANNOTATED_CONSTRUCTS = [];
		__Annotations.CONSTRUCT = null;
		__Annotations.initializeAliases();
		for (var i in __Annotations.AnnotationTypes) {
			var annotationType = __Annotations.AnnotationTypes[i];
			annotationType.systemAnnotation = true;
			__Annotations.defineAnnotation(annotationType);
		}
	},

	// Initializes the specified construct.

	initializeFrameworkState: function(construct, constructType) {
		if (construct != null && construct[__Annotations.FRAMEWORK_PREFIX] == null) {
			construct[__Annotations.FRAMEWORK_PREFIX] = {
				constructType: constructType,
				annotations: [],
				unboundAnnotations: [],
				name: null
			};
		}
	},

	// Determines if the specified construct has at least one of the annotations
	// present in the arguments list.

	hasAnnotation: function HasAnnotation(construct) {
		for (var i = 0, annotations = __Annotations.getAnnotations(construct); annotations != null && i < annotations.length; ++i) {
			for (var j = 1; j < arguments.length; ++j) {
				if (annotations[i].constructor == arguments[j]) {
					return (true);
				}
			}
		}
		return (false);
	},

	// Remove function aliases and annotations from the global NAMESPACE and
	// remove framework state from all managed object.

	removeAnnotationsFramework: function() {

		// Delete all function aliases from the global namespace.

		for (var i = 0; i < __Annotations.ALIASED_FUNCTIONS.length; ++i) {
			__Annotations.removeFromNamespace(__Annotations.ALIASED_FUNCTIONS[i]);
		}

		// Delete all defined annotations and remove convenience functions from
		// the global namespace.

		for (var i in __Annotations.ANNOTATION_TYPES.length) {
			var annotation = __Annotations.ANNOTATION_TYPES[i];
			__Annotations.removeFromNamespace(i);
			delete annotation[__Annotations.FRAMEWORK_PREFIX];
		}

		// Remove framework state from all annotated constructs.

		for (var i = 0; i < __Annotations.ANNOTATED_CONSTRUCTS.length; ++i) {
			delete __Annotations.ANNOTATED_CONSTRUCTS[i][__Annotations.FRAMEWORK_PREFIX];
		}
	},

	// Removes the object from the current namespace.

	removeFromNamespace: function(name) {
		delete __Annotations.NAMESPACE[name];
	},

	// Sets the prefix, which the annotations framework uses to attach state to
	// types, objects, and methods (e.g.: constructs), to the specified value.
	// The default prefix is "__Annotations".

	setFrameworkPrefix: function(frameworkPrefix) {
		if (frameworkPrefix != null) {
			__Annotations.removeAnnotationsFramework();
			__Annotations.FRAMEWORK_PREFIX = frameworkPrefix.toString();
			__Annotations.initializeAnnotationsFramework();
		}
	},

	// Sets the namespace, which is used to publish/make easily available
	// annotations, annotated types, and methods, to the specified value.  The
	// default namespace is "this" (e.g.: window).

	setNamespace: function(namespace) {
		if (namespace != null) {
			__Annotations.removeAnnotationsFramework();
			__Annotations.NAMESPACE = namespace;
			__Annotations.initializeAnnotationsFramework();
		}
	},

	// Sets the namespace prefix, which prefixes all globally defined annotation
	// types and methods, to the specified value.  The default namespace
	// prefix is "$".

	setNamespacePrefix: function(namespacePrefix) {
		if (namespacePrefix != null) {
			__Annotations.removeAnnotationsFramework();
			__Annotations.NAMESPACE_PREFIX = namespacePrefix.toString();
			__Annotations.initializeAnnotationsFramework();
		}
	}

}

__Annotations.initializeAnnotationsFramework();
