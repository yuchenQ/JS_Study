// 散列表即HashTable类，也叫HashMap类，是Dictionary类的一种散列实现方式。
// 散列算法的作用是尽可能的在数据结构中找到一个值。
// 在以前的系列中，如果要在数据结构中获取一个值，需要遍历整个数据结构来找到它。
// 如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。
// 散列函数的作用是给定一个键值，然后返回值在表中的位置。示例如下:
function HashTable() {
    var table = [];
    var loseloseHashCode = function (key) {  //(1)散列函数
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };
    var djb2HashCode = function (key) {  //(2)散列函数
        var hash = 5381;
        for (var i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash % 1013;
    };
    var hashCode = function (key) {
        return loseloseHashCode(key);
    };
    this.put = function (key, value) { //根据所给的key通过散列函数计算出它在表中的位置，进而作映射
        var position = hashCode(key);
        console.log(position + ' - ' + key);
        table[position] = value;
    };
    this.get = function (key) {
        return table[hashCode(key)];
    };
    this.remove = function(key){
        table[hashCode(key)] = undefined;
    };
    this.print = function () {
        for (var i = 0; i < table.length; ++i) {
            if (table[i] !== undefined) {
                console.log(i + ": " + table[i]);
            }
        }
    };
}

// 3、处理散列表中的冲突
// 有时候一些键会有相同的键值。不同的的值在散列表中对应相同位置的时候，我们称其为冲突。
// 此时，当我们通过相同的散列值去取属性值的时候会出现相互覆盖、数据丢失的情况。
// 处理冲突有几种方法：分离链接，线性探查和双散列法，这里介绍前两种。
//
// 3.1、分离链接
// 分离链接法包括为散列表的每个位置创建一个链表并将元素存储在里面。示例代码如下:
function HashTableSeparateChaining(){
    var table = [];
    var ValuePair = function(key, value){ //新的辅助类来加入LinkedList实例的元素，用到之前的链表
        this.key = key;
        this.value = value;
        this.toString = function() {
            return '[' + this.key + ' - ' + this.value + ']';
        }
    };
    var loseloseHashCode = function (key) { //散列函数得出一个散列值key
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };
    var hashCode = function(key){
        return loseloseHashCode(key);
    };
    this.put = function(key, value){
        var position = hashCode(key);
        console.log(position + ' - ' + key);
        if (table[position] == undefined) { //判断是否被占据了
            table[position] = new LinkedList();
        }
        table[position].append(new ValuePair(key, value)); //LinkedList实例中添加一个ValuePair实例
    };
    this.get = function(key) {
        var position = hashCode(key);
        if (table[position] !== undefined  && !table[position].isEmpty()){
            var current = table[position].getHead();
            while(current.next){ //遍历链表来寻找键值
                if (current.element.key === key){
                    return current.element.value;
                }
                current = current.next;
            }
            //检查元素在链表第一个或最后一个节点的情况
            if (current.element.key === key){
                return current.element.value;
            }
        }
        return undefined;
    };
    this.remove = function(key){
        var position = hashCode(key);
        if (table[position] !== undefined){
            var current = table[position].getHead();
            while(current.next){ //遍历
                if (current.element.key === key){
                    table[position].remove(current.element);
                    if (table[position].isEmpty()){
                        table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            }
            //检查元素在链表第一个或最后一个节点的情况
            if (current.element.key === key){
                table[position].remove(current.element);
                if (table[position].isEmpty()){
                    table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    };
    this.print = function() {
        for (var i = 0; i < table.length; ++i) {
            if (table[i] !== undefined) {
               console.log(table[i].toString());
            }
        }
    };
}

// 3.2、线性探查
// 当想向表中某个位置加入一个新元素的时候，如果索引为index的位置已经被占据了，就尝试index+1的位置。
// 如果index+1的位置也被占据了，就尝试index+2的位置，以此类推。示例代码如下:
function HashLinearProbing(){
    var table = [];
    var ValuePair = function(key, value){
        this.key = key;
        this.value = value;
        this.toString = function() {
            return '[' + this.key + ' - ' + this.value + ']';
        }
    };
    var loseloseHashCode = function (key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };
    var hashCode = function(key){
        return loseloseHashCode(key);
    };
    this.put = function(key, value){
        var position = hashCode(key);
        console.log(position + ' - ' + key);
        if (table[position] == undefined) { //如果没有元素存在加入
            table[position] = new ValuePair(key, value);
        } else {
            var index = ++position;
            while (table[index] != undefined){ //有的话继续往后找，直到找到加入
                index++;
            }
            table[index] = new ValuePair(key, value);
        }
    };
    this.get = function(key) {
        var position = hashCode(key);
        if (table[position] !== undefined){
            if (table[position].key === key) {
                return table[position].value;
            } else {
                var index = ++position;
                while (table[index] === undefined || table[index].key !== key){ //循环迭代
                    index++;
                }
                if (table[index].key === key) { //验证key
                    return table[index].value;
                }
            }
        }
        return undefined;
    };
    this.remove = function(key){
        var position = hashCode(key);
        if (table[position] !== undefined){
            if (table[position].key === key) {
                table[position] = undefined;
            } else {
                var index = ++position;
                while (table[index] === undefined || table[index].key !== key){
                    index++;
                }
                if (table[index].key === key) {
                    table[index] = undefined;
                }
            }
        }
    };
    this.print = function() {
        for (var i = 0; i < table.length; ++i) {
            if (table[i] !== undefined) {
                console.log(i + ' -> ' + table[i].toString());
            }
        }
    };
}
