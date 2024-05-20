//@ts-check

class Vertex {
    constructor(data) {
        this.data = data;
        this.edges = new Set();
    }
    addEdge(edge) {
        this.edges.add(edge);
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

class WeightedEdge extends Edge {
    constructor(next = null, weight = 1) {
        super(next);
        this.weight = weight;
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
    _createEdge(edgeKey) {
        return new this._edgeClass(edgeKey);
    }

    insertEdge(key, ...edgeData) {
        if (!this.vertices[key]) {
            throw new Error(`Vertex ${key} does not exist.`);
        }

        edgeData.forEach((edgeKey) => {
            if (!this.vertices[edgeKey]) {
                throw new Error(`Vertex ${edgeKey} does not exist.`);
            }
            this.vertices[key].addEdge(this._createEdge(edgeKey));
        });
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

class WeightedGraph extends Graph {
    constructor() {
        super();
        this.edgeClass = WeightedEdge;
    }
}

// const graph = new Graph();
// graph.insertVertex("a", "A");
// graph.insertVertex("b", "B");
// graph.insertVertex("c", "C");
// graph.insertVertex("d", "D");
// graph.insertVertex("e", "E");
// graph.insertVertex("f", "F");
// graph.insertVertex("g", "G");

// graph.insertEdge("a", "b", "c");
// graph.insertEdge("b", "f");
// graph.insertEdge("c", "d", "e");
// graph.insertEdge("d", "f");
// graph.insertEdge("e", "f");
// graph.insertEdge("f", "g");

// console.log(graph.breadthSearch("a", "g"));

const weightedGraph = new WeightedGraph();

weightedGraph.insertEdge;
