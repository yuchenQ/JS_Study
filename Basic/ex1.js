function ex(name, age) {
  console.log("arguments", arguments);
  console.log("name:", name, "age:", age);
  name = "yuchen";
  console.log(arguments[0]);
}
ex("Anotherhome", "556", "www.anotherhome.net");
// =============================================================================
function setName(o) {
  o.name = "DIYgod";
  o = {};
  o.name = "Anotherhome";
}

var p = {};
setName(p);
console.log(p.name); // DIYgod
// =============================================================================
function displayInfo(args) {
  var output = "";
  if (typeof args.name == "string") {
    output += "Name: " + args.name + "\n";
  }
  if (typeof args.age == "number") {
    output += "Age: " + args["age"] + "\n";
  }
  console.log(output);
}

displayInfo({
  name: "Nicholas",
  age: 29
});
displayInfo({
  name: "Greg"
});
// =============================================================================
function getClass(a) {
  const str = Object.prototype.toString.call(a);
  return /^\[object (.*)\]$/.exec(str)[1];
}
console.log(getClass(new Array("a")));
// =============================================================================
var values = [1, -3, 0, 5, 10, 1, 34, 2];
// 从小到大
console.log(values.sort((a, b) => a - b));
// 从大到小
console.log(values.sort((a, b) => b - a));
// =============================================================================
var colors = ["red", "green", "blue"];
// 1. 删除第一项(删除)
console.log(colors.splice(0, 1)); // removed是一个数组，包含删除的项 ["red"]
console.log(colors);
// 2. 从第一个位置开始插入两项(插入)
console.log(colors.splice(1, 0, "yellow", "orange")); // 如果没有删除, 返回的是一个空数组[]
console.log(colors);
// 3. 替换
console.log(colors.splice(1, 1, "red"));
console.log(colors);
// =============================================================================
var a = [1, 2, 3, 4, 5, 4, 3, 2, 1];

var everyResult = a.every(function(item, index, array) {
  return item > 2;
});
console.log(everyResult); // false

var someResult = a.some(function(item, index, array) {
  return item > 2;
});
console.log(someResult); // true

var filterResult = a.filter(function(item, index, array) {
  return item > 2;
});
console.log(filterResult); // [3, 4, 5, 4, 3]

var mapResult = a.map(function(item, index, array) {
  return item * 2;
});
console.log(mapResult); // [2, 4, 6, 8, 10, 8, 6, 4, 2]

var forEachResult = a.forEach(function(item, index, array) {
  console.log(item);
});
console.log(forEachResult); // undefined
// =============================================================================
var a = [1, 2, 3, 2, 1];

var sum1 = a.reduce(function(prev, cur, index, array) {
  console.log(index); // 1 2 3 4
  return prev + cur;
});
console.log(sum1); // 9

var sum2 = a.reduceRight(function(prev, cur, index, array) {
  console.log(index); // 3 2 1 0
  return prev + cur;
});
console.log(sum2); // 9
// =============================================================================
function createComparisonFunction(propertyName) {
  return function(object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];

    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
}
var data = [
  {
    name: "Zachary",
    age: 28
  },
  {
    name: "Nicholas",
    age: 29
  }
];

data.sort(createComparisonFunction("name"));
console.log(data[0].name); //Nicholas

data.sort(createComparisonFunction("age"));
console.log(data[0].name); //Zachary
// =============================================================================
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}
var trueFactorial = factorial;

factorial = function() {
  return 0;
};

console.log(trueFactorial(5)); //120
console.log(factorial(5)); //0
// =============================================================================
function outer() {
  inner();
}

function inner() {
  console.log(arguments.callee.caller); // function outer()...
}

outer();
// =============================================================================
var person = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName: function() {
    console.log(this.name);
  }
};
person.sayName();
// =============================================================================
var book = {
  _year: 2004,
  edition: 1
};

Object.defineProperty(book, "year", {
  get: function() {
    return this._year;
  },
  set: function(newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  }
});

book.year = 2005;
console.log(book.edition); //2
// =============================================================================
var books = {};

Object.defineProperties(books, {
  _year: {
    value: 2004
  },

  edition: {
    value: 1
  },

  year: {
    get: function() {
      return this._year;
    },

    set: function(newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
});
// =============================================================================
function Person() {}
Person.prototype = {
  name: "a",
  age: "b",
  job: "c",
  sayName: function() {
    console.log("d");
  }
};
// =============================================================================
function SpecialArray() {
  //create the array
  var values = new Array();

  //add the values
  values.push.apply(values, arguments);

  //assign the method
  values.toPipedString = function() {
    return this.join("|");
  };

  //return it
  return values;
}

var colors = new SpecialArray("red", "blue", "green");
console.log(colors.toPipedString()); //"red|blue|green"
console.log(colors instanceof SpecialArray);
// =============================================================================
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);

  this.age = age;
}
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function() {
  console.log(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
console.log(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
// =============================================================================
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends); //"Shelby,Court,Van,Rob,Barbie"

aperson = Object.create(person, {
  name: {
    value: "Greg"
  }
});
console.log(aperson.name);
// =============================================================================
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType) {
  var p = object(superType.prototype); //create object
  p.constructor = subType; //augment object
  subType.prototype = p; //assign object
}
// -----------------------------------------------------------------------------
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};
// -----------------------------------------------------------------------------
function SubType(name, age) {
  SuperType.call(this, name);

  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
  console.log(this.age);
};
// -----------------------------------------------------------------------------
var instance3 = new SubType("Nicholas", 29);
instance3.colors.push("black");
console.log(instance3.colors); //"red,blue,green,black"
instance3.sayName(); //"Nicholas";
instance3.sayAge(); //29

var instance4 = new SubType("Greg", 27);
console.log(instance4.colors); //"red,blue,green"
instance4.sayName(); //"Greg";
instance4.sayAge(); //27
