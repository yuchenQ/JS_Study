function Graph() {
  var vertices = []; //存储图中所有的顶点名字
  var adjList = new Dictionary(); //用之前的一个字典来存储邻接表
  this.addVertex = function(v) { //添加顶点
    vertices.push(v);
    adjList.set(v, []); //顶点为键，字典值为空数组
  };
  this.addEdge = function(v, w) { //添加边
    adjList.get(v).push(w); //基于有向图
    adjList.get(w).push(v); //基于无向图
  };
  this.toString = function() {
    var s = '';
    for (var i = 0; i < vertices.length; i++) {
      s += vertices[i] + ' -> ';
      var neighbors = adjList.get(vertices[i]);
      for (var j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' ';
      }
      s += '\n';
    }
    return s;
  };
  var initializeColor = function() {
    var color = [];
    for (var i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white';
    }
    return color;
  };
}
//测试
var graph = new Graph();
var myVertices = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I'
];
for (var i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.toString());

// 结果如下：
// A -> B C D
// B -> A E F
// C -> A D G
// D -> A C G H
// E -> B I
// F -> B
// G -> C D
// H -> D
// I -> E
// 1.3、图的遍历
// 和树的数据结构类似，我们可以访问图的所有节点。有两种算法可以对图进行遍历：
// 广度优先搜索（Breadth-First Search，BFS）和深度优先搜索（Depth-First Search，DFS）。
// 图遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否含有环等。
//
// 图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。
// 对于两种图遍历算法，都需要明确指出第一个被访问的顶点。
// 完全探索一个顶点要求我们查看该顶点的每一条边。
// 对应每一条边所连接的没有被访问过的顶点，将其标注为被发现的，并将其加进待访问顶点列表中。
//
// 为了保证算法的效率，务必访问每个顶点至多两次。连通图中每条边和顶点都会被访问到。
// 当要标注已经访问过的顶点时，我们用三种颜色来反映它们的状态：
//
// 白色：表示该顶点还没有被访问。
// 灰色：表示该顶点被访问过，但并未被探索过。
// 黑色：表示该顶点被访问过且被完全搜索过。
// 1.3.1、广度优先搜索（BFS）
// 广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访问图的一层。
// 换句话说，就是先宽后深的访问顶点。以下是从顶点v开始的广度优先搜索算法所遵循的步骤。
//
// （1）创建一个队列Q。
// （2）将v标注为被发现的（灰色），并将v入队列Q。
// （3）如果Q非空，则运行以下步骤：
// （a）将u从Q中出队列；
// （b）将标注u为被发现的（灰色）；
// （c）将u所有未被访问过的邻点（白色）入队列；
// （d）将u标注为已被探索的（黑色）；
// 示例代码如下：

var initializeColor = function() {
  var color = [];
  for (var i = 0; i < vertices.length; i++) {
    color[vertices[i]] = 'white'; //初始化所有的顶点都是白色
  }
  return color;
};
this.bfs = function(v, callback) {
  var color = initializeColor(),
    queue = new Queue(); //创建一个队列
  queue.enqueue(v); //入队列
  while (!queue.isEmpty()) {
    var u = queue.dequeue(), //出队列
      neighbors = adjList.get(u); //邻接表
    color[u] = 'grey'; //发现了但还未完成对其的搜素
    for (var i = 0; i < neighbors.length; i++) {
      var w = neighbors[i]; //顶点名
      if (color[w] === 'white') {
        color[w] = 'grey'; //发现了它
        queue.enqueue(w); //入队列循环
      }
    }
    color[u] = 'black'; //已搜索过
    if (callback) {
      callback(u);
    }
  }
};
//测试如下：
function printNode(value) {
  console.log('Visited vertex: ' + value);
}
graph.bfs(myVertices[0], printNode);

//      结果如下：
//      Visited vertex: A
//      Visited vertex: B
//      Visited vertex: C
//      Visited vertex: D
//      Visited vertex: E
//      Visited vertex: F
//      Visited vertex: G
//      Visited vertex: H
//      Visited vertex: I
// 1.3.2、深度优先搜索（BFS）
// 深度优先搜索算法将会是从第一个指定的顶点开始遍历图，
// 沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径。
// 换句话说，它是先深度后广度地访问顶点。深度优先搜索算法不需要一个源顶点。
// 要访问顶点v，照如下的步骤做：
//
// （1）标注v为被发现的（灰色）。
// （2）对应v的所有未访问的邻点w。
// （a）访问顶点w。
// （3）标注v为已被探索的（黑色）。
// 如你所见，深度优先搜索的步骤是递归的，
// 这意味着深度优先搜索算法使用栈来存储函数调用（由递归调用所创建的栈）。示例代码如下：

this.dfs = function(callback) {
  var color = initializeColor(); //前面的颜色数组
  for (var i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === 'white') {
      dfsVisit(vertices[i], color, callback); //递归调用未被访问过的顶点
    }
  }
};
var dfsVisit = function(u, color, callback) {
  color[u] = 'grey';
  if (callback) {
    callback(u);
  }
  var neighbors = adjList.get(u); //邻接表
  for (var i = 0; i < neighbors.length; i++) {
    var w = neighbors[i];
    if (color[w] === 'white') {
      dfsVisit(w, color, callback); //添加顶点w入栈
    }
  }
  color[u] = 'black';
};
//测试如下：
function printNode(value) {
  console.log('Visited vertex: ' + value);
}
graph.dfs(printNode);
结果如下：
Visited vertex: A
Visited vertex: B
Visited vertex: E
Visited vertex: I
Visited vertex: F
Visited vertex: C
Visited vertex: D
Visited vertex: G
Visited vertex: H
