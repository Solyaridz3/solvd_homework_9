//@ts-check
import { Queue } from "./Queue.js";
import { Stack } from "./Stack.js";
class Vertex {
    constructor(data) {
        this.data = data;
        this.edges = new Set();
    }
    /**
     * Adds an edge to the set of edges associated with this vertex.
     *
     * @param {Edge} edge - The edge to be added.
     * @return {void} This function does not return anything.
     */
    addEdge(edge) {
        this.edges.add(edge);
    }
    /**
     * Returns the edge that connects this vertex to the specified vertex.
     *
     * @param {Vertex} edgeTo - The vertex to find the edge to.
     * @return {Edge|undefined} The edge connecting this vertex to the specified vertex, or undefined if no such edge exists.
     */
    getEdge(edgeTo) {
        return this.getEdges().find((edge) => edge.next === edgeTo);
    }

    /**
     * Returns an array of all the edges associated with this vertex.
     *
     * @return {Array} An array of Edge objects representing the edges connected to this vertex.
     */
    getEdges() {
        return Array.from(this.edges);
    }
}
class Edge {
    /**
     * Constructs a new instance of the Edge class.
     *
     * @param {string | null} next - The next edge key value.
     */
    constructor(next = null) {
        this.next = next;
    }
}

export class Graph {
    _edgeClass = Edge;
    constructor() {
        this.vertices = {};
    }

    /**
     * Sets the edge class of the object.
     *
     * @param newEdgeClass - The new edge class to be set.
     */
    set edgeClass(newEdgeClass) {
        this._edgeClass = newEdgeClass;
    }

    /**
     * Inserts a new vertex with the given key and data into the graph.
     *
     * @param {string} key - The unique identifier of the vertex.
     * @param {any} data - The data associated with the vertex.
     * @throws {Error} If a vertex with the same key already exists.
     */
    insertVertex(key, data) {
        if (this.vertices[key]) {
            throw new Error(`Vertex ${key} already exists.`);
        }
        this.vertices[key] = new Vertex(data);
    }

    /**
     * Inserts edges into the graph for the specified vertex key.
     *
     * @param {string} key - The key of the vertex to insert edges into.
     * @param {Array<Array<string, *>>} edgesData - An array of arrays containing the keys of the vertices to connect and any additional arguments to pass to the edge constructor.
     * @throws {Error} If the specified vertex key does not exist or if any of the specified edge vertices do not exist.
     */
    insertEdges(key, edgesData) {
        if (!this.vertices[key]) {
            throw new Error(`Vertex ${key} does not exist.`);
        }

        edgesData.forEach(([edgeKey, ...args]) => {
            if (!this.vertices[edgeKey]) {
                throw new Error(`Vertex ${edgeKey} does not exist.`);
            }
            this.vertices[key].addEdge(
                this._createEdgeInstance(edgeKey, ...args)
            );
        });
    }

    /**
     * Creates an instance of the edge class with the given data.
     *
     * @param {...*} edgeData - The data to pass to the edge class constructor.
     * @return {Edge} The newly created edge instance.
     */
    _createEdgeInstance(...edgeData) {
        return new this._edgeClass(...edgeData);
    }

    /**
     * Removes a vertex from the graph.
     *
     * @param {string} key - The unique identifier of the vertex to be removed.
     * @throws {Error} If the vertex with the given key does not exist.
     */
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

    /**
     * Removes an edge from the graph.
     *
     * @param {string} key - The key of the vertex from which the edge is removed.
     * @param {string} edgeKey - The key of the vertex to which the edge is connected.
     * @throws {Error} If either vertex does not exist.
     */
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

    /**
     * Performs a breadth-first search starting from the specified start vertex and ending at the specified end vertex.
     *
     * @param {string} start - The key of the start vertex.
     * @param {string} end - The key of the end vertex.
     * @return {Object} An object containing the following properties:
     *   - hasPath: A boolean indicating whether a path from the start vertex to the end vertex was found.
     *   - path: An array representing the path from the start vertex to the end vertex, or null if no path was found.
     * @throws {Error} If either the start vertex or the end vertex does not exist.
     */
    breadthSearch(start, end) {
        if (!this.vertices[start] || !this.vertices[end]) {
            throw new Error(`One or both vertices do not exist.`);
        }
        let queue = new Queue();
        queue.enqueue([start, [start]]);
        let visited = new Set();

        while (!queue.isEmpty()) {
            //@ts-ignore
            const current = queue.dequeue();
            const [currentKey, path] = current;
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
                    queue.enqueue([nextKey, [...path, nextKey]]);
                }
            }
        }

        return { hasPath: false, path: null };
    }

    /**
     * Performs a depth-first search starting from the specified start vertex and ending at the specified end vertex.
     *
     * @param {string} start - The key of the start vertex.
     * @param {string} end - The key of the end vertex.
     * @return {Object} An object containing the following properties:
     *   - hasPath: A boolean indicating whether a path from the start vertex to the end vertex was found.
     *   - path: An array representing the path from the start vertex to the end vertex, or an empty array if no path was found.
     * @throws {Error} If either the start vertex or the end vertex does not exist.
     */
    depthSearch(start, end) {
        if (!this.vertices[start] || !this.vertices[end]) {
            throw new Error(`One or both vertices do not exist.`);
        }
        // let stack = [[start, [start]]];
        let stack = new Stack();
        stack.push([start, [start]]);
        let visited = new Set();

        while (stack.length > 0) {
            //@ts-ignore
            const [currentKey, path] = stack.pop();
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
                    stack.push([nextKey, [...path, nextKey]]);
                }
            }
        }

        return { hasPath: false, path: [] };
    }
}

class WeightedEdge extends Edge {
    /**
     * Constructs a new instance of the WeightedEdge class.
     *
     * @param {string | null} next - The key of the next vertex in the edge, or null if there is no next vertex.
     * @param {number} weight - The weight of the edge.
     */
    constructor(next = null, weight) {
        super(next);
        this.weight = weight;
    }
}

export class WeightedGraph extends Graph {
    /**
     * Constructs a new instance of the WeightedGraph class.
     */
    constructor() {
        super();
        this.edgeClass = WeightedEdge;
    }
    /**
     * Inserts edges into the graph for the specified vertex key.
     *
     * @param {string} key - The key of the vertex to insert edges into.
     * @param {Object} edgesData - An object containing the keys and weight of the vertices connected with this vertex.
     * @throws {Error} If the specified vertex key does not exist or if any of the specified edge vertices do not exist.
     */
    insertEdges(key, edgesData) {
        super.insertEdges(key, Object.entries(edgesData));
    }

    /**
     * Implements Dijkstra's algorithm to find the shortest paths from a given start vertex to all other vertices in the graph.
     *
     * @param {string} startKey - The key of the start vertex.
     * @throws {Error} If the start vertex does not exist in the graph.
     * @return {Object} An object containing the shortest distances from the start vertex to all other vertices in the graph.
     */
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
            neighbors = this.vertices[vertex].getEdges();
            for (const { next: neighbor, weight } of neighbors) {
                let newDistance = distance + weight;
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                }
            }

            processed.push(vertex);
            vertex = this.findVertexLowestDistance(distances, processed);
        }
        return distances;
    }

    /**
     * Finds the vertex with the lowest distance from the given distances object,
     * excluding any vertices that have already been processed.
     *
     * @param {Object} distances - An object containing the distances from a start vertex to each vertex.
     * @param {Array} processed - An array of vertices that have already been processed.
     * @return {string|undefined} - The key of the vertex with the lowest distance, or undefined if no such vertex exists.
     */
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
