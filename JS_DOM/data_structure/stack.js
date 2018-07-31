// 栈是一种遵从后进先出(LIFO)原则的有序集合。新添加的或待删除的元素都保存在栈的末尾。
// 称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都靠近栈底。
// 现在通过数组的方法来实现栈，代码如下：
function Stack() {
  var items = [];
  this.push = function(element) { //添加一个（或几个）新元素到栈顶
    items.push(element);
  };
  this.pop = function() { //移除栈顶的元素，同时返回被移除元素
    return items.pop();
  };
  this.peek = function() { //返回栈顶的元素，但并不对栈做任何修改
    return items[items.length - 1];
  };
  this.isEmpty = function() { //如果栈内没有任何元素就返回true，否则返回false
    return items.length == 0;
  };
  this.size = function() { //返回栈里的元素个数
    return items.length;
  };
  this.clear = function() { //移除栈里的所有元素
    items = [];
  };
  this.print = function() { //打印
    console.log(items.toString());
  };
  this.toString = function() {
    return items.toString();
  };
}

// Stack ES6: Symbol:
let _items = Symbol();
class Stack2 {
    constructor () {
        this[_items] = [];
    }
    push(element){
        this[_items].push(element);
    }
    pop(){
        return this[_items].pop();
    }
    peek(){
        return this[_items][this[_items].length-1];
    }
    isEmpty(){
        return this[_items].length == 0;
    }
    size(){
        return this[_items].length;
    }
    clear(){
        this[_items] = [];
    }
    print(){
        console.log(this.toString());
    }
    toString(){
        return this[_items].toString();
    }
}

// Stack ES6: WeakMap + closure:
let StackEs6 = (function() {
  const items = new WeakMap();
  class Stack3 {
    constructor() {
      items.set(this, []);
    }
    push(element) {
      let s = items.get(this);
      s.push(element);
    }
    pop() {
      let s = items.get(this);
      let r = s.pop();
      return r;
    }
    peek() {
      let s = items.get(this);
      return s[s.length - 1];
    }
    isEmpty() {
      return items.get(this).length == 0;
    }
    size() {
      let s = items.get(this);
      return s.length;
    }
    clear() {
      items.set(this, []);
    }
    print() {
      console.log(this.toString());
    }
    toString() {
      return items.get(this).toString();
    }
  }
  return Stack3;
})();

// 下面是一个小算法题，可以视为栈的综合利用，如何将10进制数字转成2进制数字：
function divideBy2(decNumber) {
  var remStack = new Stack(),
    rem,
    binaryString = "";

  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString(); //余数除完翻转过来就是2进制数
  }
  return binaryString;
}

// 升级版， 如何将10进制数字转成任意进制数字，代码如下：
function baseConverter(decNumber, base) {
  var remStack = new Stack(),
    rem,
    baseString = "",
    digits = "0123456789ABCDEF";

  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}
baseConverter(100345, 2) // "11000011111111001"
baseConverter(100345, 8) //"303771"
baseConverter(100345, 16) // "187F9"

// 汉诺塔问题：
function towerOfHanoi(n, from, to, helper){

    if (n > 0){
        towerOfHanoi(n-1, from, helper, to);
        to.push(from.pop());
        console.log('-----');
        console.log('Source: ' + from.toString());
        console.log('Dest: ' + to.toString());
        console.log('Helper: ' + helper.toString());
        towerOfHanoi(n-1, helper, to, from);
    }
}

var source = new Stack();
source.push(3);
source.push(2);
source.push(1);

var dest = new Stack();
var helper = new Stack();

towerOfHanoi(source.size(), source, dest, helper);

source.print();
helper.print();
dest.print();
