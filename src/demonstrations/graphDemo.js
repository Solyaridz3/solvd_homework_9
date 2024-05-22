import { Graph, WeightedGraph } from "../Graph.js";


const graph = new Graph();
graph.insertVertex("a", "A");
graph.insertVertex("b", "B");
graph.insertVertex("c", "C");
graph.insertVertex("d", "D");
graph.insertVertex("e", "E");
graph.insertVertex("f", "F");
graph.insertVertex("g", "G");

graph.insertEdges("a", ["b", "c"]);
graph.insertEdges("b", ["f"]);
graph.insertEdges("c", ["d", "e"]);
graph.insertEdges("d", ["f"]);
graph.insertEdges("e", ["f"]);
graph.insertEdges("f", ["g"]);

console.log("Default graph breadthSearch:", graph.breadthSearch("a", "g"));
console.log("Default graph depthsSearch:", graph.depthSearch("a", "g"));

const weightedGraph = new WeightedGraph();

weightedGraph.insertVertex("a", "ALLIGATOR");
weightedGraph.insertVertex("b", "BAT");
weightedGraph.insertVertex("c", "CAT");
weightedGraph.insertVertex("d", "DOG");
weightedGraph.insertVertex("f", "FROG");
weightedGraph.insertVertex("g", "GIRAFFE");

weightedGraph.insertEdges("a", { d: 2, f: 5, g: 7 });
weightedGraph.insertEdges("d", { g: 2, f: 1, c: 10 });
weightedGraph.insertEdges("g", { c: 2 });

console.log("Weighted graph dijkstra algorithm:", weightedGraph.dijkstra("a"));
console.log(
    "Weighted graph breadth search",
    weightedGraph.breadthSearch("a", "g")
);

console.log('Weighted graph depth search');

//Initial weighted graph
console.log(weightedGraph.vertices["a"].edges);

weightedGraph.removeVertex("f");
weightedGraph.removeEdge("a", "d");

// Weighted graph after vertex and edge removal
console.log(weightedGraph.vertices["a"].edges);