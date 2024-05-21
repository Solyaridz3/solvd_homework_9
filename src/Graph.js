//@ts-check
class Vertex {
    constructor(data) {
        this.data = data;
        this.edges = new Set();
    }
    addEdge(edge) {
        this.edges.add(edge);
    }
    getEdge(edgeTo) {
        return this.getEdges().find((edge) => edge.next === edgeTo);
    }

    getEdges() {
        return Array.from(this.edges);
    }
}
class Edge {
    constructor(next = null) {
        this.next = next;
    }
}

class Graph {
    _edgeClass = Edge;
    constructor() {
        this.vertices = {};
    }

    set edgeClass(newEdgeClass) {
        this._edgeClass = newEdgeClass;
    }

    insertVertex(key, data) {
        if (this.vertices[key]) {
            throw new Error(`Vertex ${key} already exists.`);
        }
        this.vertices[key] = new Vertex(data);
    }

    insertEdges(key, edgeKeys) {
        if (!this.vertices[key]) {
            throw new Error(`Vertex ${key} does not exist.`);
        }

        edgeKeys.forEach(([edgeKey, ...args]) => {
            if (!this.vertices[edgeKey]) {
                throw new Error(`Vertex ${edgeKey} does not exist.`);
            }
            this.vertices[key].addEdge(
                this._createEdgeInstance(edgeKey, ...args)
            );
        });
    }

    _createEdgeInstance(...edgeData) {
        return new this._edgeClass(...edgeData);
    }

    removeVertex(key) {
        if (!this.vertices[key]) {
            throw new Error(`Vertex ${key} does not exist.`);
        }
        delete this.vertices[key];
        for (let vertexKey in this.vertices) {
            this.vertices[vertexKey].edges = new Set(
                [...this.vertices[vertexKey].getEdges()].filter(
                    (edge) => edge.next !== key
                )
            );
        }
    }

    removeEdge(key, edgeKey) {
        if (!this.vertices[key] || !this.vertices[edgeKey]) {
            throw new Error(`One or both vertices do not exist.`);
        }
        this.vertices[key].edges = new Set(
            [...this.vertices[key].getEdges()].filter(
                (edge) => edge.next !== edgeKey
            )
        );
    }

    breadthSearch(start, end) {
        if (!this.vertices[start] || !this.vertices[end]) {
            throw new Error(`One or both vertices do not exist.`);
        }
        let queue = [[start, [start]]];
        let visited = new Set();

        while (queue.length > 0) {
            //@ts-ignore
            const [currentKey, path] = queue.shift();
            if (visited.has(currentKey)) {
                continue;
            }
            visited.add(currentKey);

            for (let edge of this.vertices[currentKey].getEdges()) {
                const nextKey = edge.next;

                if (nextKey === end) {
                    return { hasPath: true, path: [...path, nextKey] };
                }

                if (!visited.has(nextKey)) {
                    queue.push([nextKey, [...path, nextKey]]);
                }
            }
        }

        return { hasPath: false, path: null };
    }
}

class WeightedEdge extends Edge {
    constructor(next = null, weight) {
        super(next);
        this.weight = weight;
    }
}

class WeightedGraph extends Graph {
    constructor() {
        super();
        this.edgeClass = WeightedEdge;
    }
    insertEdges(key, edgesData) {
        super.insertEdges(key, Object.entries(edgesData));
    }

    dijkstra(startKey) {
        if (!this.vertices[startKey]) {
            throw new Error(`Vertex ${startKey} does not exist.`);
        }
        const distances = {};
        const processed = [];
        let neighbors = [];
        Object.keys(this.vertices).forEach((vertexKey) => {
            if (vertexKey !== startKey) {
                const edge = this.vertices[startKey].getEdge(vertexKey);
                let distance = !edge ? Infinity : edge.weight;
                distances[vertexKey] = distance;
            }
        });
        let vertex = this.findVertexLowestDistance(distances, processed);
        while (vertex) {
            const distance = distances[vertex];
            //@ts-ignore
            neighbors = this.vertices[vertex].getEdges();
            for (const { next: neighbor, weight } of neighbors) {
                let newDistance = distance + weight;
                //@ts-ignore
                if (newDistance < distances[neighbor]) {
                    //@ts-ignore
                    distances[neighbor] = newDistance;
                }
            }
            processed.push(vertex);
            vertex = this.findVertexLowestDistance(distances, processed);
        }
        return distances;
    }

    findVertexLowestDistance(distances, processed) {
        let lowestDistance = Infinity;
        let lowestVertex;
        Object.keys(distances).forEach((vertex) => {
            let distance = distances[vertex];
            if (distance < lowestDistance && !processed.includes(vertex)) {
                lowestDistance = distance;
                lowestVertex = vertex;
            }
        });
        return lowestVertex;
    }
}

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

//Initial weighted graph
console.log(weightedGraph.vertices["a"].edges);

weightedGraph.removeVertex("f");
weightedGraph.removeEdge("a", "d");

// Weighted graph after vertex and edge removal
console.log(weightedGraph.vertices["a"].edges);
