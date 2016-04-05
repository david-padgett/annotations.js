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

function Annotations(rootNamespace, namespacePrefix) {

	//** Constants

	var __THIS = this;
	var __ROOT_NAMESPACE = rootNamespace;
	var __NAMESPACE_PREFIX = namespacePrefix == null ? "$" : namespacePrefix;
	var __APP_PREFIX = __NAMESPACE_PREFIX + this.constructor.name;
	var __PACKAGE = new __Package(new __PackageDelegate());

	//** Functions

	// Initializes the specified construct.

	function __initializeConstruct(construct) {
		if (construct != null && construct[__APP_PREFIX] == null) {
			construct[__APP_PREFIX] = new AnnotationsFrameworkState();
		}
	};

	function __matchesAnnotationType(annotations, annotationType) {
		if (annotations.length == 0) {
			return (false);
		}
		for (var i = 0; i < annotations.length; ++i) {
			if (!annotations[i].constructor[__APP_PREFIX].matchesType(annotationType)) {
				return (false);
			}
		}
		return (true);
	};

	//** Inner Classes

	function __Package(delegate) {

		//** Constants

		//** Functions

		//** Inner Classes

		//** Instance Variables

		this.delegate = delegate;
		this.containers = [];

		//** Instance Initializer

		//** Instance Operations

		// Adds the specified name/value pair to the provided namespace.

		this.addToNamespace = function addToNamespace(name, value) {
			__ROOT_NAMESPACE[name] = value;
			this.invokeDelegate(arguments.callee.name);
		};

		// Invokes an operation implemented by the delegate.

		this.invokeDelegate = function(operation) {
			if (this.delegate != null && this.delegate[operation] != null && this.delegate[operation].constructor === Function) {
				delegate[operation].apply(delegate, Array.prototype.slice.call(arguments, 1));
			}
		}

		// Create the API dispatcher function that will be invoked when the API
		// is invoked within the namespace provided via the main constructor.

		this.initializeDispatcher = function(container, api) {
			var dispatcher = function __PackageApiDispatcher() {
				var args = Array.prototype.slice.call(arguments, 0);
				return (api.apply(container, args));
			};
			return (dispatcher);
		};

		// Add all named functions within the specified containers to the
		// provided namespace.

		this.install = function install(containers) {
			this.containers = containers;
			this.manageAliasedFunctions(this.containers, true);
			this.invokeDelegate(arguments.callee.name);
		};

		// Add or remove named functions within the specified containers to the
		// namespace provided via the main constructor.

		this.manageAliasedFunctions = function(containers, addFunctions) {
			for (var i = 0; i < containers.length; ++i) {
				var container = containers[i];
				for (var j in container) {
					if (container[j] != null && container[j].constructor === Function && container[j].name.length > 0) {
						var api = container[j];
						var namespaceName = __NAMESPACE_PREFIX + container[j].name;
						if (addFunctions) {
							this.addToNamespace(namespaceName, this.initializeDispatcher(container, api));
						}
						else {
							this.removeFromNamespace(namespaceName);
						}
					}
				}
			}
		};

		// Remove the specified property from the provided namespace.

		this.removeFromNamespace = function removeFromNamespace(name) {
			this.invokeDelegate(arguments.callee.name);
			if (!(delete __ROOT_NAMESPACE[name])) {
				__ROOT_NAMESPACE[name] = null;
			}
		};

		// Remove from the provided namespace all functions added by install.

		this.uninstall = function uninstall() {
			this.invokeDelegate(arguments.callee.name);
			this.manageAliasedFunctions(this.containers, false);
		};

		//** Constructor

		if (__ROOT_NAMESPACE == null) {
			throw new Error("Unable to initialize " + __THIS.constructor.name + ": No root namespace provided when instantiated.");
		}

	}

	// __PACKAGE delegate.

	function __PackageDelegate() {

		//** Constants

		//** Functions

		//** Inner Classes

		//** Instance Variables

		//** Instance Initializer

		//** Instance Operations

		this.install = function() {
			for (var i in __THIS.systemAnnotationTypes) {
				__THIS.systemAnnotations.push(__THIS.systemAnnotationTypes[i]);
				__THIS.defineAnnotation(__THIS.systemAnnotationTypes[i]);
			}
		};

		this.uninstall = function() {

			// Delete all defined annotations and remove the corresponding
			// __DefinedAnnotationeHandler from the global namespace.

			for (var name in Object.keys(__THIS.annotationTypes)) {
				__PACKAGE.removeFromNamespace(name);
				delete __THIS.annotationTypes[name];
			}

			// Remove framework state from all annotated constructs.

			while (__THIS.annotatedConstructs.length > 0) {
				delete __THIS.annotatedConstructs.pop()[__APP_PREFIX];
			}

		};

		//** Constructor

	}

	function AnnotationsFrameworkState() {

		this.annotations = [];
		this.name = null;
		this.annotationHandler = null;

		this.initialize = function(name, annotationHandler) {
			this.name = name;
			this.annotationHandler = annotationHandler;
		};

		this.matchesType = function(annotationType) {
			if (this.annotations.length == 0) {
				return (false);
			}
			for (var i = 0; i < this.annotations.length; ++i) {
				if (this.annotations[i].constructor !== annotationType) {
					return (false);
				}
			}
			return (true);
		};

	};

	//** Instance Variables

	this.annotationTypes = {};
	this.annotatedConstructs = [];
	this.systemAnnotations = [];
	this.unboundAnnotations = [];
	this.unboundAnnotationsAreSystemAnnotations = false;
	this.pragmas = {};

	this.systemAnnotationTypes = {

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

		// A system level annotation used to identify user-defined annotations
		// that are used to inject pragmas into the Javascript interpreter.

		PragmaAnnotation: function Pragma(name, value) {
			this.name = name;
			this.value = value;
		}

	};

	//** Instance Initializer

	//** Instance Operations

	// Adds the specified construct to the list of all annotated constructs,
	// duplicates and null constructs are ignored.

	this.addAnnotatedConstruct = function(construct) {
		if (construct != null && this.annotatedConstructs.indexOf(construct) == -1) {
			this.annotatedConstructs.push(construct);
		}
	};

	this.addAnnotation = function() {
		if (arguments.length > 0) {
			var annotation = arguments[0];
			var args = Array.prototype.slice.call(arguments, 1);
			__ROOT_NAMESPACE[__NAMESPACE_PREFIX + annotation].apply(null, args);
		}
	},

	this.addPragma = function(pragma) {
		if (pragma.name == null) {
			this.pragmas = {};
		}
		else {
			this.pragmas[pragma.name] = pragma.value;
		}
	};

	// Adds the specified object to the current namespace.

	this.addUnboundAnnotation = function(annotation) {

		// Ensure that the unbound annotations cache contains either
		// system annotations or user-defined annotations, but not both.

		var systemAnnotation = this.systemAnnotations.indexOf(annotation.constructor) != -1;
		if (this.unboundAnnotations.length > 0 && systemAnnotation !== this.unboundAnnotationsAreSystemAnnotations) {
			this.clearUnboundAnnotations();
			throw new Error("Unable to add unbound annotations:  System and non-system annotation types cannot be combined.");
		}
		this.unboundAnnotationsAreSystemAnnotations = systemAnnotation;

		// System annotations are added directly to the cache.

		if (!systemAnnotation) {
			var frameworkState = annotation.constructor[__APP_PREFIX];

			// Type annotations cannot be combined with non-type annotations.

			if (__matchesAnnotationType(this.unboundAnnotations, this.systemAnnotationTypes.TypeAnnotation)) {
				if (!frameworkState.matchesType(this.systemAnnotationTypes.TypeAnnotation)) {
					this.clearUnboundAnnotations();
					throw new Error("Unable to add unbound annotations:  '" + annotation.constructor.name + "' is not a type annotation.");
				}
			}
			else {

				// Attach unbound annotations to the next un-initialized method.

				if (__matchesAnnotationType(this.unboundAnnotations, this.systemAnnotationTypes.MethodAnnotation)) {
					this.annotateMethods();
				}
				else {

					// Object annotations cannot be combined with non-object
					// annotations.

					if (__matchesAnnotationType(this.unboundAnnotations, this.systemAnnotationTypes.ObjectAnnotation)) {
						if (!frameworkState.matchesType(this.systemAnnotationTypes.ObjectAnnotation)) {
							this.clearUnboundAnnotations();
							throw new Error("Unable to add unbound annotations:  '" + annotation.constructor.name + "' is not an object annotation.");
						}
					}
				}
			}

			if (frameworkState.matchesType(this.systemAnnotationTypes.MethodAnnotation)) {
				this.annotateMethods();
			}

		}
		this.unboundAnnotations.push(annotation);
	};

	// Annotates the specified construct with annotations that have been declared
	// but not yet bound to a construct.

	this.annotate = function Annotate(construct) {
		if (construct != null) {
			if (construct.constructor == Function) {
				if (this.unboundAnnotationsAreSystemAnnotations) {

					// The construct to be annotated is a user-defined annotation.

					this.defineAnnotation(construct);
				}
				else {

					// The construct to be annotated is a type or method.

					this.annotateConstruct(construct);
				}
			}
			else {

				// The construct to be annotated is an object.

				this.annotateConstruct(construct);
				this.annotateMethods();
			}
			this.addAnnotatedConstruct(construct);
		}
		return (construct);
	};

	// Annotates the specified construct.

	this.annotateConstruct = function(construct) {

		// Initialize the construct for use by the framework.

		__initializeConstruct(construct);
		construct[__APP_PREFIX].annotations = this.unboundAnnotations;
		this.clearUnboundAnnotations();
	};

	// Annotate all methods in the current scope.  Attach unbound annotations to
	// the first operation without framework state.  Note: this implementation
	// assumes that iterating over the prototype of an object will yield
	// predictable results and violates ???.  This issue may be mitigated by
	// annotating all operations.

	this.annotateMethods = function() {
		var construct = this.annotatedConstructs.length == 0 ? null : this.annotatedConstructs[this.annotatedConstructs.length - 1];
		if (construct == null) {
			this.clearUnboundAnnotations();
			throw new Error("Unable to annotate methods, no method scope is available.");
		}
		var prototype = construct.constructor == Function ? construct.prototype : construct;
		for (var i in prototype) {
			var operation = prototype[i];
			if (operation.constructor == Function && operation[__APP_PREFIX] == null) {
				this.annotateConstruct(operation);
			}
		}
	};

	this.clearUnboundAnnotations = function() {
		this.unboundAnnotations = [];
		this.unboundAnnotationsAreSystemAnnotations = false;
	};

	this.createAnnotatedInstance = function CreateAnnotatedInstance(type) {
		var obj = this.annotate({});
		obj.constructor = type;
		for (var i in type.prototype) {
			obj[i] = type.prototype[i];
		}
		var args = Array.prototype.slice.call(arguments, 1);
		type.apply(obj, args);
		this.annotateMethods();
		return (obj);
	};

	// Initialize and register the specified annotation type.

	this.defineAnnotation = function(annotationType) {

		var prefix = this.getPragmaValue("AnnotationsPrefix");
		var namespaceName = (prefix != null ? prefix : __NAMESPACE_PREFIX) + annotationType.name;
		if (this.annotationTypes[namespaceName] != null) {
			this.clearUnboundAnnotations();
			throw new Error("Unable to define annotation.  The annotation type has already been defined.");
		}

		// This function is bound to the new annotation and is invoked each time
		// that annotation is specified.

		var annotationHandler = function __DefinedAnnotationeHandler() {

			// Create a new instance of the annotation.  Copying state into a
			// generic works since annotations have state but not behavior.

			var annotation = {};
			annotation.constructor = annotationType;
			annotationType.apply(annotation, arguments);

			if (annotationType == __THIS.systemAnnotationTypes.PragmaAnnotation) {
				__THIS.addPragma(annotation);
			}
			else {
				__THIS.addUnboundAnnotation(annotation);
			}
		};

		// Attach all unbound, presumably system annotations to the new
		// annotation.

		this.annotateConstruct(annotationType);
		annotationType[__APP_PREFIX].initialize(namespaceName, annotationHandler);

		// Add the handler for the defined annotation to the global namespace.

		this.annotationTypes[namespaceName] = annotationHandler;
		__PACKAGE.addToNamespace(namespaceName, annotationHandler);
	};

	// Retrieves the list of all annotated types and objects.

	this.getAnnotatedConstructs = function GetAnnotatedConstructs() {
		var constructs = [];
		var annotationTypes = [];
		for (var i = 0; i < arguments.length; ++i) {
			annotationTypes.push(arguments[i]);
		}
		for (var i = 0; i < this.annotatedConstructs.length; ++i) {
			var construct = this.annotatedConstructs[i];
			if (this.systemAnnotations.indexOf(construct) == -1) {
				for (var j = 0; j < annotationTypes.length; ++j) {
					if (this.hasAnnotation(construct, annotationTypes[j])) {
						constructs.push(construct);
						break;
					}
				}
			}
		}
		return (constructs);
	};

	// Returns the set of annotation types managed by the framework.

	this.getAnnotationTypes = function GetAnnotationTypes() {
		var annotationTypes = [];
		for (var i in this.annotationTypes) {
			annotationTypes.push(this.annotationTypes[i]);
		}
		return (annotationTypes);
	};

	this.getAnnotations = function GetAnnotations(construct) {
		var state = construct[__APP_PREFIX];
		return (state != null ? state.annotations : null);
	};

	this.getPragmaValue = function GetPragmaValue(name) {
		for (var i in this.pragmas) {
			if (i == name) {
				return (this.pragmas[i]);
			}
		}
		return (null);
	};

	// Determines if the specified construct has at least one of the annotations
	// present in the arguments list.

	this.hasAnnotation = function HasAnnotation(construct, annotationType) {
		var frameworkState = construct[__APP_PREFIX];
		if (frameworkState == null || frameworkState.annotations.length == 0) {
			return (false);
		}
		for (var i = 0; i < frameworkState.annotations.length; ++i) {
			if (frameworkState.annotations[i].constructor === annotationType) {
				return (true);
			}
		}
		return (false);
	};

	//** Constructor

	__PACKAGE.install([__THIS]);
}
