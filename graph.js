class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray){
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, seen=new Set([start]), vals=[]) {
    // iterative

    // let stack = [start];
    // let seen = new Set();
    // let vals = [];

    // while (stack.length){
    //   let curr = stack.pop();
    //   seen.add(curr);
    //   vals.push(curr.value);

    //   for (let neighbor of curr.adjacent){
    //     if (!seen.has(neighbor)) {
    //       stack.push(neighbor);
    //       seen.add(neighbor);
    //     }
    //   }
    // }

    // return vals;

    if (start === null) return vals;

    vals.push(start.value);

    for (let neighbor of start.adjacent){
      if (!seen.has(neighbor)){
        seen.add(neighbor);
        this.depthFirstSearch(neighbor, seen, vals);
      }
    }

    return vals;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let seen = new Set([start]);
    let vals = [];

    while (queue.length){
      let curr = queue.shift();
      vals.push(curr.value);

      for (let neighbor of curr.adjacent){
        if (!seen.has(neighbor)){
          queue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }

    return vals;
  }
}

module.exports = {Graph, Node}