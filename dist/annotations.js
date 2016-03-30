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


function Annotations(rootNamespace, namespacePrefix, frameworkPrefix) {

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

	var annotationsFramework = this;

	this.rootNamespace = null;
	this.namespacePrefix = this.constructor.name;
	this.frameworkPrefix = this.constructor.name;
	this.annotationTypes = {};
	this.annotatedConstructs = [];
	this.systemAnnotations = [];
	this.unboundAnnotations = [];
	this.unboundAnnotationsAreSystemAnnotations = false;
	this.pragmas = {};

	this.systemAnnotationTypes = {


		MethodAnnotation: function MethodAnnotation() {
		},


		ObjectAnnotation: function ObjectAnnotation() {
		},


		TypeAnnotation: function TypeAnnotation() {
		},


		PragmaAnnotation: function Pragma(name, value) {
			this.name = name;
			this.value = value;
		}

	};


	this.addAnnotatedConstruct = function(construct) {
		if (construct != null && this.annotatedConstructs.indexOf(construct) == -1) {
			this.annotatedConstructs.push(construct);
		}
	};

	this.addAnnotation = function() {
		if (arguments.length > 0) {
			var annotation = arguments[0];
			var args = Array.prototype.slice.call(arguments, 1);
			this.rootNamespace[this.namespacePrefix + annotation].apply(null, args);
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


	this.addToNamespace = function(name, value) {
		this.rootNamespace[name] = value;
	};

	this.addUnboundAnnotation = function(annotation) {


		var systemAnnotation = this.systemAnnotations.indexOf(annotation.constructor) != -1;
		if (this.unboundAnnotations.length > 0 && systemAnnotation !== this.unboundAnnotationsAreSystemAnnotations) {
			this.clearUnboundAnnotations();
			throw new Error("Unable to add unbound annotations:  System and non-system annotation types cannot be combined.");
		}
		this.unboundAnnotationsAreSystemAnnotations = systemAnnotation;


		if (!systemAnnotation) {
			var frameworkState = this.getFrameworkState(annotation.constructor);


			if (this.matchesAnnotationType(this.unboundAnnotations, this.systemAnnotationTypes.TypeAnnotation)) {
				if (!frameworkState.matchesType(this.systemAnnotationTypes.TypeAnnotation)) {
					this.clearUnboundAnnotations();
					throw new Error("Unable to add unbound annotations:  '" + annotation.constructor.name + "' is not a type annotation.");
				}
			}
			else {


				if (this.matchesAnnotationType(this.unboundAnnotations, this.systemAnnotationTypes.MethodAnnotation)) {
					this.annotateMethods();
				}
				else {


					if (this.matchesAnnotationType(this.unboundAnnotations, this.systemAnnotationTypes.ObjectAnnotation)) {
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


	this.annotate = function Annotate(construct) {
		if (construct != null) {
			if (construct.constructor == Function) {
				if (this.unboundAnnotationsAreSystemAnnotations) {


					this.defineAnnotation(construct);
				}
				else {


					this.annotateConstruct(construct);
				}
			}
			else {


				this.annotateConstruct(construct);
				this.annotateMethods();
			}
			this.addAnnotatedConstruct(construct);
		}
		return (construct);
	};


	this.annotateConstruct = function(construct) {


		this.initializeConstruct(construct);
		this.getFrameworkState(construct).annotations = this.unboundAnnotations;
		this.clearUnboundAnnotations();
	};


	this.annotateMethods = function() {
		var construct = this.annotatedConstructs.length == 0 ? null : this.annotatedConstructs[this.annotatedConstructs.length - 1];
		if (construct == null) {
			this.clearUnboundAnnotations();
			throw new Error("Unable to annotate methods, no method scope is available.");
		}
		var prototype = construct.constructor == Function ? construct.prototype : construct;
		for (var i in prototype) {
			var operation = prototype[i];
			if (operation.constructor == Function && this.getFrameworkState(operation) == null) {
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


	this.defineAnnotation = function(annotationType) {

		var prefix = this.getPragmaValue("AnnotationsPrefix");
		var namespaceName = (prefix != null ? prefix : this.namespacePrefix) + annotationType.name;
		if (this.annotationTypes[namespaceName] != null) {
			this.clearUnboundAnnotations();
			throw new Error("Unable to define annotation.  The annotation type has already been defined.");
		}


		var annotationHandler = function __DefinedAnnotationeHandler() {


			var annotation = {};
			annotation.constructor = annotationType;
			annotationType.apply(annotation, arguments);

			if (annotationType == annotationsFramework.systemAnnotationTypes.PragmaAnnotation) {
				annotationsFramework.addPragma(annotation);
			}
			else {
				annotationsFramework.addUnboundAnnotation(annotation);
			}
		};


		this.annotateConstruct(annotationType);
		this.getFrameworkState(annotationType).initialize(namespaceName, annotationHandler);


		this.annotationTypes[namespaceName] = annotationHandler;
		this.addToNamespace(namespaceName, annotationHandler);
	};


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


	this.getAnnotationTypes = function GetAnnotationTypes() {
		var annotationTypes = [];
		for (var i in this.annotationTypes) {
			annotationTypes.push(this.annotationTypes[i]);
		}
		return (annotationTypes);
	};

	this.getAnnotations = function GetAnnotations(construct) {
		var state = this.getFrameworkState(construct);
		return (state != null ? state.annotations : null);
	};


	this.getFrameworkState = function(construct) {
		return (construct == null ? null : construct[this.frameworkPrefix]);
	};

	this.getPragmaValue = function GetPragmaValue(name) {
		for (var i in this.pragmas) {
			if (i == name) {
				return (this.pragmas[i]);
			}
		}
		return (null);
	};


	this.hasAnnotation = function HasAnnotation(construct, annotationType) {
		var frameworkState = this.getFrameworkState(construct);
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


	this.initialize = function(rootNamespace, namespacePrefix, frameworkPrefix) {

		if (rootNamespace == null) {
			throw new Error("Unable to initialize " + this.constructor.name + ": No root namespace provided when framework was instantiated.");
		}

		this.rootNamespace = rootNamespace;
		this.namespacePrefix = namespacePrefix == null ? this.namespacePrefix : namespacePrefix;
		this.frameworkPrefix = frameworkPrefix == null ? this.frameworkPrefix : frameworkPrefix;
		this.annotationTypes = {};
		this.annotatedConstructs = [];
		this.initializeAliasedFunctions([this], true);
		this.initializeSystemAnnotations();
	};


	this.initializeAliasedFunctions = function(containers, addFunctions) {
		for (var i = 0; i < containers.length; ++i) {
			var container = containers[i];
			for (var j in container) {
				if (container[j] != null && container[j].constructor == Function && container[j].name != "") {
					var api = container[j];
					var namespaceName = this.namespacePrefix + container[j].name;
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


	this.initializeConstruct = function(construct) {
		if (construct != null && construct[this.frameworkPrefix] == null) {
			construct[this.frameworkPrefix] = new AnnotationsFrameworkState();
		}
	};

	this.initializeDispatcher = function(container, api) {
		var dispatcher = function __AnnotationApiDispatcher() {
			var args = Array.prototype.slice.call(arguments, 0);
			return (api.apply(container, args));
		};
		return (dispatcher);
	};

	this.initializeSystemAnnotations = function() {
		for (var i in this.systemAnnotationTypes) {
			this.systemAnnotations.push(this.systemAnnotationTypes[i]);
			this.defineAnnotation(this.systemAnnotationTypes[i]);
		}
	};

	this.matchesAnnotationType = function(annotations, annotationType) {
		if (annotations.length == 0) {
			return (false);
		}
		for (var i = 0; i < annotations.length; ++i) {
			if (!this.getFrameworkState(annotations[i].constructor).matchesType(annotationType)) {
				return (false);
			}
		}
		return (true);
	};


	this.removeAnnotationsFramework = function() {


		this.initializeAliasedFunctions([this], false);


		for (var name in Object.keys(this.annotationTypes)) {
			this.removeFromNamespace(name);
			delete this.annotationTypes[name];
		}


		while (this.annotatedConstructs.length > 0) {
			delete this.annotatedConstructs.pop()[this.frameworkPrefix];
		}

	};


	this.removeFromNamespace = function(name) {
		delete this.rootNamespace[name];
	};


	this.initialize(rootNamespace, namespacePrefix, frameworkPrefix);
}
