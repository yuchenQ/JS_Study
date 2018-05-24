// 队列遵循的是FIFO（先进先出）的原则的一组有序的项。队列从尾部添加新元素，并从顶部移除元素，
// 最新添加的元素必须排列在队列的末尾。
function Queue() {
  var items = [];
  this.enqueue = function(element) { //向队列尾部添加一个（或是多个）元素
    items.push(element);
  };
  this.dequeue = function() { //移除队列的第一个元素，并返回被移除的元素
    return items.shift();
  };
  //返回队列的第一个元素——最先被添加的,也将是最先被移除的元素。队列不做任何变动。
  //（不移除元素，只返回元素信息。与stack的peek方法类似）
  this.front = function() {
    return items[0];
  };
  this.isEmpty = function() { //如果队列内没有任何元素就返回true，否则返回false
    return items.length == 0;
  };
  this.clear = function() { //移除队列里的所有元素
    items = [];
  };
  this.size = function() { //返回队列里的元素个数
    return items.length;
  };
  this.print = function() { //打印
    console.log(items.toString());
  };
}

// 2.1 、优先队列
// 指队列元素的添加和移除是基于优先级的。实现一个优先队列，有两种选项：
// 1.设置优先级，然后再正确的位置添加元素；
// 2.或者用入队操作添加元素，然后按照优先级移除他们。
// 下例将会在正确的位置添加元素，如下：
function PriorityQueue() {
  var items = [];
  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }
  this.enqueue = function(element, priority) {
    var queueElement = new QueueElement(element, priority);
    if (this.isEmpty()) {
      items.push(queueElement);
    } else {
      var added = false;
      for (var i = 0; i < items.length; i++) {
        if (queueElement.priority < items[i].priority) {
          items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
    }
    if (!added) {
      items.push(queueElement);
    }
  }
  this.dequeue = function() {
    return items.shift();
  };
  this.front = function() {
    return items[0];
  };
  this.isEmpty = function() {
    return items.length == 0;
  };
  this.size = function() {
    return items.length;
  };
  this.print = function() {
    for (var i = 0; i < items.length; i++) {
      console.log(items[i].element + ' - ' + items[i].priority);
    }
  };
}

// 2.2 、循环队列——击鼓传花
// 击鼓传花游戏，在这个游戏中，孩子们围成一个圆圈，把花尽快的传递给旁边的人。
// 某一时刻传花停止，这个时候花落在谁手里，谁就退出圆圈结束游戏。
// 重复这个过程，直到只剩下一个孩子。例子如下：
function hotPotato(namelist, num) {
  var queue = new Queue();
  for (var i = 0; i < namelist.length; i++) {
    queue.enqueue(namelist[i]);
  }
  var eliminated = '';
  while (queue.size() > 1) {
    for (var i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(eliminated + "在游戏中淘汰了。");
  }
  return queue.dequeue();
}
var names = ["a", "b", "c", "d", "e"];
var winner = hotPotato(names, 7);
console.log("胜利者" + winner);
//c在游戏中淘汰了。
//b在游戏中淘汰了。
//e在游戏中淘汰了。
//d在游戏中淘汰了。
//胜利者a
