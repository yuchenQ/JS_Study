// 链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。
// 每个元素由一个存储元素本事的节点和一个指向下一个元素的引用组成。
// 相对于传统的数组，链表的一个好处在于，添加或者删除元素的时候不需要移动其他元素。
// 然而，链表需要使用指针，因此实现链表时需要额外注意。
// 数组和链表的一个不同在于数组可以直接访问任何位置的元素，
// 而想要访问链表中的一个元素，需要从起点开始迭代列表。
// 1.1、单向链表
// 下面是单向链表的具体实现代码：
function LinkedList() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
  };
  var length = 0; //链表长度
  var head = null; //第一个节点
  this.append = function(element) {
    var node = new Node(element),
      current;
    if (head === null) { //列表为空
      head = node;
    } else { //列表不为空
      current = head; //现在只知道第一项head
      while (current.next) { //找到列表的最后一项
        current = current.next;
      }
      //建立链接
      current.next = node;
    }
    length++; //更新列表长度
  };
  this.insert = function(position, element) {
    //检查越界值
    if (position >= 0 && position <= length) {
      var node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) { //在第一个位置添加
        node.next = current;
        head = node;
      } else { //在中间或者尾部添加
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current; //先连上添加的节点
        previous.next = node; //再断开之前的连接
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      var current = head,
        previous,
        index = 0; //用来迭代列表，直到到达目标位置
      if (position === 0) { //移除第一项
        head = current.next;
      } else { //移除中间或者尾部最后一项
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        //连接前一项和后一项，跳过当前的项，相当于移除了当前项
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  this.remove = function(element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };
  this.indexOf = function(element) {
    var current = head,
      index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      index++; //记录位置
      current = current.next;
    }
    return -1;
  };
  this.isEmpty = function() {
    return length === 0;
  };
  this.size = function() {
    return length;
  };
  this.getHead = function() {
    return head;
  };
  this.toString = function() {
    var current = head,
      string = '';
    while (current) {
      string += current.element; //拼接
      current = current.next;
    }
    return string;
  };
  this.print = function() {
    console.log(this.toString());
  };
}

// 1.2 、双向链表
// 双向链表和单向链表的区别在于，在单向链表中，一个节点只有链向下一个节点的链接。
// 而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素。示例代码如下：
function DoublyLinkedList() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
    this.prev = null; //新添加的
  };
  var length = 0;
  var head = null;
  var tail = null; //新添加的
  this.append = function(element) {
    var node = new Node(element),
      current;
    if (head === null) { //列表为空
      head = node;
      tail = node;
    } else {
      tail.next = node;
      node.prev = tail;
      tail = node;
    }
    length++;
  };
  this.insert = function(position, element) {
    if (position >= 0 && position <= length) {
      var node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) { //在第一个位置
        if (!head) { //列表为空
          head = node;
          tail = node;
        } else { //列表不为空
          node.next = current;
          current.prev = node;
          head = node;
        }
      } else if (position === length) { //最后一项
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node; //把node节点连接进去前一个节点和后一个节点

        current.prev = node; //断掉之前previous和current的连接
        node.prev = previous; //prev同样需要连接
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      var current = head,
        previous,
        index = 0;
      if (position === 0) { //移除第一项
        head = current.next;
        if (length === 1) { // 列表只有一项
          tail = null;
        } else {
          head.prev = null;
        }
      } else if (position === length - 1) {
        移除最后一项
        current = tail; // {4}
        tail = current.prev;
        tail.next = null;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next; // 链接前一项和后一项，跳过当前项
        current.next.prev = previous; //修复prev
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  this.remove = function(element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };
  this.indexOf = function(element) {
    var current = head,
      index = -1;
    //检查第一项
    if (element == current.element) {
      return 0;
    }
    index++;
    //检查中间项
    while (current.next) {
      if (element == current.element) {
        return index;
      }
      current = current.next;
      index++;
    }
    //检查最后一项
    if (element == current.element) {
      return index;
    }
    return -1;
  };
  this.isEmpty = function() {
    return length === 0;
  };
  this.size = function() {
    return length;
  };
  this.toString = function() {
    var current = head,
      s = current
        ? current.element
        : '';
    while (current && current.next) {
      current = current.next;
      s += ', ' + current.element;
    }
    return s;
  };
  this.inverseToString = function() {
    var current = tail,
      s = current
        ? current.element
        : '';
    while (current && current.prev) {
      current = current.prev;
      s += ', ' + current.element;
    }
    return s;
  };
  this.print = function() {
    console.log(this.toString());
  };
  this.printInverse = function() {
    console.log(this.inverseToString());
  };
  this.getHead = function() {
    return head;
  };
  this.getTail = function() {
    return tail;
  }
}

// 1.3 、循环链表
// 循环链表可以像单向链表那样只有单向引用，也可以像双向链表那样有双向引用。
// 循环链表和其他链表的区别在于最后一个元素指向下一个元素的引用不是null，
// 而是指向第一个元素（head）。示例代码如下：
function CircularLinkedList() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
  };
  var length = 0;
  var head = null;
  this.append = function(element) {
    var node = new Node(element),
      current;
    if (head === null) { //列表为空
      head = node;
    } else {
      current = head;
      while (current.next !== head) { //最后一个元素将是head，而不是null
        current = current.next;
      }
      current.next = node; //建立连接
    }
    node.next = head; //首尾相连起来变成一个环列表
    length++;
  };
  this.insert = function(position, element) {
    if (position >= 0 && position <= length) {
      var node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) { //在第一项
        node.next = current;
        while (current.next !== head) {
          current = current.next;
        }
        head = node;
        current.next = head;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
        if (node.next === null) { //在最后一个元素更新
          node.next = head;
        }
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      var current = head,
        previous,
        index = 0;
      if (position === 0) {
        while (current.next !== head) {
          current = current.next;
        }
        head = head.next;
        current.next = head; //更新最后一项
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  this.remove = function(element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };
  this.indexOf = function(element) {
    var current = head,
      index = -1;
    if (element == current.element) { //检查第一项
      return 0;
    }
    index++;
    while (current.next !== head) { //检查列表中间
      if (element == current.element) {
        return index;
      }
      current = current.next;
      index++;
    }
    if (element == current.element) { //检查最后一项
      return index;
    }
    return -1;
  };
  this.isEmpty = function() {
    return length === 0;
  };
  this.size = function() {
    return length;
  };
  this.getHead = function() {
    return head;
  };
  this.toString = function() {
    var current = head,
      s = current.element;
    while (current.next !== head) {
      current = current.next;
      s += ', ' + current.element;
    }
    return s.toString();
  };
  this.print = function() {
    console.log(this.toString());
  };
}
