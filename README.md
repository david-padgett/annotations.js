#Annotations.js
> A type, method, and object annotations-enabling library for JavaScript.

##License

MIT

##Examples

> Example 1 - Declare an annotation used only for types.

```javascript
$TypeAnnotation();
function ExampleTypeAnnotation(description) {
	this.description = description;
}

$DefineAnnotation(ExampleTypeAnnotation);
```

> Example 2 - Declare two annotations used only for methods.

```javascript
$MethodAnnotation();
function ExampleMethodAnnotation1() {
}

$MethodAnnotation();
function ExampleMethodAnnotation2() {
}
```

> Example 3 - Declare an annotation used for both types and methods.

```javascript
$TypeAnnotation(); $MethodAnnotation();
function ExampleTypeAndMethodAnnotation() {
}
```

$DefineAnnotation(ExampleTypeAndMethodAnnotation);

> Example 4 - Annotate a type and methods defined via the prototype.

```javascript
$ExampleTypeAnnotation();
function ExamplePrototypedType() {
}

$Annotate(ExamplePrototypedType);

ExamplePrototypedType.prototype.operation0 = function() {
};

$ExampleMethodAnnotation1();
ExamplePrototypedType.prototype.operation1 = function() {
};

$ExampleMethodAnnotation1(); $ExampleMethodAnnotation2();
ExamplePrototypedType.prototype.operation2 = function() {
}

$BindAnnotations();
```

> Example 5 - Annotate a type and methods defined internally - annotations are not bound until the class is instantiated.

```javascript
$ExampleTypeAnnotation();
function ExampleInternalType() {
	$Annotate(this);
	this.operation0 = function() {
	};
	$ExampleMethodAnnotation1();
	this.operation1 = function() {
	};
	$ExampleMethodAnnotation1(); $ExampleMethodAnnotation2();
	this.operation2 = function() {
	};
	$BindAnnotations();
}

$Annotate(ExampleInternalType);
var object = new ExampleInternalType();
```

> Example 6 - Annotate an object literal.

```javascript
var ExampleObjectLiteral = {

	operation0: function() {
	},

	operation1: function() {
	},

	operation2: function() {
	}

}

$Annotate(ExampleObjectLiteral);
$Annotate(ExampleObjectLiteral.operation1, $ExampleMethodAnnotation1());
$Annotate(ExampleObjectLiteral.operation2, $ExampleMethodAnnotation1(), $ExampleMethodAnnotation2());
```

> Example 7 - Define an annotation with a user-defined prefix

```javascript
$TypeAnnotation();
function ExampleTypeAnnotation() {
}

$DefineAnnotation(ExampleTypeAnnotation, "zz");

zzExampleTypeAnnotation();
function ExamplePrototypedType() {
}
```