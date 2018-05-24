// 1.1、冒泡排序
// 冒泡排序比较任何两个相邻的项，如果第一个项比第二个大，则交换它们。
// 元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名。

function ArrayList(){
    var array = [];
    this.insert = function(item){
        array.push(item);
    };
    var swap = function(index1, index2){ //交换值
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    };
    this.toString= function(){
        return array.join();
    };
    this.bubbleSort = function(){ // 常规的冒泡排序
        var length = array.length;
        for (var i=0; i<length; i++){
            for (var j=0; j<length-1; j++ ){ // 内循环迭代至倒数第二位
                if (array[j] > array[j+1]){
                    swap(j, j+1);
                }
            }
        }
    };
    this.modifiedBubbleSort = function(){ //改进后的冒泡排序，避免内循环不必要的比较
        var length = array.length;
        for (var i=0; i<length; i++){
            for (var j=0; j<length-1-i; j++ ){ //减去最后一个已经排好序的位置
                if (array[j] > array[j+1]){
                    swap(j, j+1);
                }
            }
        }
    };
}

// 1.2、选择排序
// 选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并将其放在第一位，
// 接着找到第二小的值并将其放在第二位，以此类推。

  this.selectionSort = function(){
      var length = array.length,
          indexMin;
      for (var i=0; i<length-1; i++){
          indexMin = i;
          for (var j=i; j<length; j++){ // 内循环记录array[i]后面最小的index位置
              if(array[indexMin]>array[j]){
                  indexMin = j;
              }
          }
          if (i !== indexMin){
              swap(i, indexMin);
          }
      }
  };

// 1.3、插入排序
// 插入排序每次排一个数组项，假定第一项已经排好序了，接着，
// 它和第二项进行比较，如果第二项比第一项大则待在原位，否则插入到第一项之前，以此类推。

  this.insertionSort = function(){
      var length = array.length,
          j, temp;
      for (var i=1; i<length; i++){ //假设第一个位置已经排好位置了
          j = i;
          temp = array[i];
          while (j>0 && array[j-1] > temp){ //数组前面的比temp大
              array[j] = array[j-1]; //把这个值移到当前位置
              j--;
          }
          array[j] = temp;
      }
  };

// 1.4、归并排序
// 归并排序是第一个可以被实际使用的排序算法，前面的三个排序算法的时间复杂度度为O（n²），
// 但是这个归并排序性能不错，其时间复杂度为O（nlogⁿ）。
// 归并排序是一种分治算法。其思想是将原始数组切分成较小的数组，
// 直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。

  this.mergeSort = function(){
      array = mergeSortRec(array);
  };
  var mergeSortRec = function(array){
      var length = array.length;
      if(length === 1) { //切割数组直到只有一个元素
          return array;
      }
      var mid = Math.floor(length / 2), //分层两边，左和右
          left = array.slice(0, mid),
          right = array.slice(mid, length);
      return merge(mergeSortRec(left), mergeSortRec(right)); //递归函数
  };
  var merge = function(left, right){
      var result = [],
          il = 0,
          ir = 0;
      while(il < left.length && ir < right.length) { //决定是谁先入数组，小的先入
          if(left[il] < right[ir]) {
              result.push(left[il++]);
          } else{
              result.push(right[ir++]);
          }
      }
      while (il < left.length){ //大的后入
          result.push(left[il++]);
      }
      while (ir < right.length){ //大的后入
          result.push(right[ir++]);
      }
      return result;
  };

// 1.5、快速排序
// 快速排序也许是最常用的排序算法了，它的时间复杂度为O（nlogⁿ），
// 且它的性能通常比其他的复杂度O（nlogⁿ）的排序算法要好。
// 和归并排序一样，快速排序也使用分治的方法，
// 将原始数组分为较小的数组（但它没有像归并排序那样将他们分割开）。

  this.quickSort = function(){
      quick(array,  0, array.length - 1);
  };
  var partition = function(array, left, right) {
      var pivot = array[Math.floor((right + left) / 2)], //选择一个中间值
          i = left,
          j = right;
      while (i <= j) {
          while (array[i] < pivot) { //移动指针直到找到一个元素比中间值大
              i++;
          }
          while (array[j] > pivot) { //移动指针直到找到一个元素比中间值小
              j--;
          }
          if (i <= j) { //左项比右项大，交换后同时移动两个指针
              swapQuickStort(array, i, j);
              i++;
              j--;
          }
      }
      return i;
  };
  var swapQuickStort = function(array, index1, index2){
      var aux = array[index1];
      array[index1] = array[index2];
      array[index2] = aux;
  };
  var quick = function(array, left, right){
      var index; //用来将子数组分离为较小值数组和较大值数组
      if (array.length > 1) {
          index = partition(array, left, right); //划分数组
          if (left < index - 1) { //如果子数组存在较小值的元素,递归
              quick(array, left, index - 1);
          }
          if (index < right) { ////如果子数组存在较大值的元素,递归
              quick(array, index, right);
          }
      }
      return array;
  };

// 2、搜索
// 2.1、顺序搜索
// 顺序或线性搜索是最基本的搜索算法。
// 它的机制是，将一个数据结构中的元素和我们要找的元素做比较。顺序搜索是最低效的一种搜索算法。

  this.sequentialSearch = function(item){
      for (var i=0; i<array.length; i++){
          if (item === array[i]){
              return i;
          }
      }
      return -1;
  };

// 2.2、二分搜索
// 这个算法要求被搜索的数据结构已排序。以下是该算法遵循的步骤：
//
// 1)选择数组的中间值
//
// 2)如果选中值是待搜索值，那么算法执行完毕。
//
// 3)如果待搜索值比选中值要小，则返回步骤1并在选中值左边的子数组中寻找。
//
// 4)如果待搜索值比选中值要大，则返回步骤1并在选中值右边的子数组中寻找。

this.binarySearch = function(item){
    this.quickSort();
    var low = 0,
        high = array.length - 1,
        mid, element;
    while (low <= high){
        mid = Math.floor((low + high) / 2);
        element = array[mid];
        if (element < item) {
            low = mid + 1;
        } else if (element > item) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
};
