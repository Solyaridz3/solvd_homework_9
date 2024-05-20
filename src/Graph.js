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
    constructor(next = null, weight) {
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
    insertEdges(key, edgesData) {
        super.insertEdges.apply(this, [key, Object.entries(edgesData)]);
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

console.log(graph.breadthSearch("a", "g"));

const weightedGraph = new WeightedGraph();

weightedGraph.insertVertex("a", "April");
weightedGraph.insertVertex("d", "Day");
weightedGraph.insertVertex("f", "Fells");
weightedGraph.insertVertex("g", "Great");

weightedGraph.insertEdges("a", { d: 2, f: 3, g: 7 });

console.log(weightedGraph.vertices["a"].edges);
