"use strict";

/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 David Padgett/Summit Street, Inc.
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

/* global */
/* eslint-disable no-unused-vars */

/**
 * This function implements a singleton type (e.g: a service) that can install
 * named operations into a namespace.  The operation names are optionally
 * prefixed to prevent collisions with other functions.
 */

function __Service(rootNamespace, namespacePrefix, serviceDelegate) {

	var __THIS = this;
	var __ROOT_NAMESPACE = rootNamespace;
	var __NAMESPACE_PREFIX = namespacePrefix == null ? "$" : namespacePrefix;
	var __SERVICE_MANAGER = new __ServiceManager(serviceDelegate == null ? __THIS : serviceDelegate);

	function __ServiceManager(delegate) {

		this.__delegate = delegate;
		this.__containers = [];

		this.addToNamespace = function addToNamespace(name, value) {
			__ROOT_NAMESPACE[name] = value;
			this.invokeDelegate("addToNamespace");
		};

		this.invokeDelegate = function(operation) {
			if (this.__delegate != null && this.__delegate[operation] != null && this.__delegate[operation].constructor === Function) {
				delegate[operation].apply(delegate, Array.prototype.slice.call(arguments, 1));
			}
		};

		this.initializeDispatcher = function(container, api) {
			var dispatcher = function __ServiceManagerApiDispatcher() {
				var args = Array.prototype.slice.call(arguments, 0);
				return (api.apply(container, args));
			};
			return (dispatcher);
		};

		this.install = function install(containers) {
			this.__containers = containers;
			this.manageAliases(this.__containers, true);
			this.invokeDelegate("install");
		};

		this.manageAliases = function(containers, addFunctions) {
			for (var i = 0; i < containers.length; ++i) {
				var container = containers[i];
				for (var j in container) {
					if (container[j] != null) {
						var name = null;
						var value = null;
						if (container[j].constructor !== Function && j[0] != "_") {
							name = __NAMESPACE_PREFIX + j;
							value = container[j];
						}
						else {
							if (container[j].constructor === Function && container[j].name.length > 0) {
								var api = container[j];
								name = __NAMESPACE_PREFIX + container[j].name;
								value = this.initializeDispatcher(container, api);
							}
						}
						if (name != null && value != null) {
							if (addFunctions) {
								this.addToNamespace(name, value);
							}
							else {
								this.removeFromNamespace(name);
							}
						}
					}
				}
			}
		};

		this.removeFromNamespace = function removeFromNamespace(name) {
			this.invokeDelegate("removeFromNamespace");
			if (!(delete __ROOT_NAMESPACE[name])) {
				__ROOT_NAMESPACE[name] = null;
			}
		};

		this.uninstall = function uninstall() {
			this.invokeDelegate("uninstall");
			this.manageAliases(this.__containers, false);
		};

		if (__ROOT_NAMESPACE == null) {
			throw new Error("Unable to initialize " + __THIS.constructor.name + ": No root namespace provided when instantiated.");
		}

	}

	this._getServiceManager = function() {
		return (__SERVICE_MANAGER);
	};

	__SERVICE_MANAGER.install([__THIS]);
	return (__THIS);
}

/* global */
/* eslint-disable no-console, no-unused-vars */

function Annotations(rootNamespace, namespacePrefix) {

	var __THIS = this;
	var __ROOT_NAMESPACE = rootNamespace;
	var __NAMESPACE_PREFIX = namespacePrefix == null ? "$" : namespacePrefix;
	var __SERVICE_PREFIX = __NAMESPACE_PREFIX + this.constructor.name;

	function __initializeConstruct(construct) {
		if (construct != null && construct[__SERVICE_PREFIX] == null) {
			construct[__SERVICE_PREFIX] = new AnnotationsFrameworkState();
		}
	}

	function __matchesAnnotationType(annotations, annotationType) {
		if (annotations.length == 0) {
			return (false);
		}
		for (var i = 0; i < annotations.length; ++i) {
			if (!annotations[i].constructor[__SERVICE_PREFIX].matchesType(annotationType)) {
				return (false);
			}
		}
		return (true);
	}

	function __ServiceDelegate() {

		this.install = function() {
			for (var i in __THIS.__systemAnnotationTypes) {
				__THIS.__systemAnnotations.push(__THIS.__systemAnnotationTypes[i]);
				__THIS.defineAnnotation(__THIS.__systemAnnotationTypes[i]);
			}
		};

		this.uninstall = function() {

			for (var name in Object.keys(__THIS.__annotationTypes)) {
				__THIS._getServiceManager().removeFromNamespace(name);
				delete __THIS.__annotationTypes[name];
			}

			while (__THIS.__annotatedConstructs.length > 0) {
				delete __THIS.__annotatedConstructs.pop()[__SERVICE_PREFIX];
			}

		};

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

	}

	this.__annotationTypes = {};
	this.__annotatedConstructs = [];
	this.__systemAnnotations = [];
	this.__unboundAnnotations = [];
	this.__unboundAnnotationsAreSystemAnnotations = false;
	this.__pragmas = {};

	this.__systemAnnotationTypes = {

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
		if (construct != null && this.__annotatedConstructs.indexOf(construct) == -1) {
			this.__annotatedConstructs.push(construct);
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
			this.__pragmas = {};
		}
		else {
			this.__pragmas[pragma.name] = pragma.value;
		}
	};

	this.addUnboundAnnotation = function(annotation) {

		var systemAnnotation = this.__systemAnnotations.indexOf(annotation.constructor) != -1;
		if (this.__unboundAnnotations.length > 0 && systemAnnotation !== this.__unboundAnnotationsAreSystemAnnotations) {
			this.clearUnboundAnnotations();
			throw new Error("Unable to add unbound annotations:  System and non-system annotation types cannot be combined.");
		}
		this.__unboundAnnotationsAreSystemAnnotations = systemAnnotation;

		if (!systemAnnotation) {
			var frameworkState = annotation.constructor[__SERVICE_PREFIX];

			if (__matchesAnnotationType(this.__unboundAnnotations, this.__systemAnnotationTypes.TypeAnnotation)) {
				if (!frameworkState.matchesType(this.__systemAnnotationTypes.TypeAnnotation)) {
					this.clearUnboundAnnotations();
					throw new Error("Unable to add unbound annotations:  '" + annotation.constructor.name + "' is not a type annotation.");
				}
			}
			else {

				if (__matchesAnnotationType(this.__unboundAnnotations, this.__systemAnnotationTypes.MethodAnnotation)) {
					this.annotateMethods();
				}
				else {

					if (__matchesAnnotationType(this.__unboundAnnotations, this.__systemAnnotationTypes.ObjectAnnotation)) {
						if (!frameworkState.matchesType(this.__systemAnnotationTypes.ObjectAnnotation)) {
							this.clearUnboundAnnotations();
							throw new Error("Unable to add unbound annotations:  '" + annotation.constructor.name + "' is not an object annotation.");
						}
					}
				}
			}

			if (frameworkState.matchesType(this.__systemAnnotationTypes.MethodAnnotation)) {
				this.annotateMethods();
			}

		}
		this.__unboundAnnotations.push(annotation);
	};

	this.annotate = function Annotate(construct) {
		if (construct != null) {
			if (construct.constructor == Function) {
				if (this.__unboundAnnotationsAreSystemAnnotations) {

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

		__initializeConstruct(construct);
		construct[__SERVICE_PREFIX].annotations = this.__unboundAnnotations;
		this.clearUnboundAnnotations();
	};

	this.annotateMethods = function() {
		var construct = this.__annotatedConstructs.length == 0 ? null : this.__annotatedConstructs[this.__annotatedConstructs.length - 1];
		if (construct == null) {
			this.clearUnboundAnnotations();
			throw new Error("Unable to annotate methods, no method scope is available.");
		}
		var prototype = construct.constructor == Function ? construct.prototype : construct;
		for (var i in prototype) {
			var operation = prototype[i];
			if (operation.constructor == Function && operation[__SERVICE_PREFIX] == null) {
				this.annotateConstruct(operation);
			}
		}
	};

	this.clearUnboundAnnotations = function() {
		this.__unboundAnnotations = [];
		this.__unboundAnnotationsAreSystemAnnotations = false;
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
		var namespaceName = (prefix != null ? prefix : __NAMESPACE_PREFIX) + annotationType.name;
		if (this.__annotationTypes[namespaceName] != null) {
			this.clearUnboundAnnotations();
			throw new Error("Unable to define annotation.  The annotation type has already been defined.");
		}

		var annotationHandler = function __DefinedAnnotationeHandler() {

			var annotation = {};
			annotation.constructor = annotationType;
			annotationType.apply(annotation, arguments);

			if (annotationType == __THIS.__systemAnnotationTypes.PragmaAnnotation) {
				__THIS.addPragma(annotation);
			}
			else {
				__THIS.addUnboundAnnotation(annotation);
			}
		};

		this.annotateConstruct(annotationType);
		annotationType[__SERVICE_PREFIX].initialize(namespaceName, annotationHandler);

		this.__annotationTypes[namespaceName] = annotationHandler;
		__THIS._getServiceManager().addToNamespace(namespaceName, annotationHandler);
	};

	this.getAnnotatedConstructs = function GetAnnotatedConstructs() {
		var constructs = [];
		var annotationTypes = [];
		for (var i = 0; i < arguments.length; ++i) {
			annotationTypes.push(arguments[i]);
		}
		for (var j = 0; j < this.__annotatedConstructs.length; ++j) {
			var construct = this.__annotatedConstructs[j];
			if (this.__systemAnnotations.indexOf(construct) == -1) {
				for (var k = 0; k < annotationTypes.length; ++k) {
					if (this.hasAnnotation(construct, annotationTypes[k])) {
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
		for (var i in this.__annotationTypes) {
			annotationTypes.push(this.__annotationTypes[i]);
		}
		return (annotationTypes);
	};

	this.getAnnotations = function GetAnnotations(construct) {
		var state = construct[__SERVICE_PREFIX];
		return (state != null ? state.annotations : null);
	};

	this.getPragmaValue = function GetPragmaValue(name) {
		for (var i in this.__pragmas) {
			if (i == name) {
				return (this.__pragmas[i]);
			}
		}
		return (null);
	};

	this.hasAnnotation = function HasAnnotation(construct, annotationType) {
		var frameworkState = construct[__SERVICE_PREFIX];
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

	__Service.apply(this, [rootNamespace, namespacePrefix, new __ServiceDelegate()]);
}

