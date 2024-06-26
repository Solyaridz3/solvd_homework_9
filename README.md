# SOLVD homework №9


## Demonstration of classes and algorithms usage can be found inside demonstrations folder


### **Data Structure Implementations**

**Useful to store values that works by principle of last in first out**
1. **Stack**: Implement a class for a stack data structure. Included methods for push, pop, and peek.

**The same stack but with ability to get max and min values**

2. **MinMaxStack**: Extends Stack class, implementing getMax and getMin methods that are able to get values with O(1) complexity,
uses two stacks for min and max numbers in order to store Min and Max values.

**Data structure useful to store last in first out values**

3. **Queue**: Class implementation for a queue data structure that includes methods for enqueue, dequeue, and peek.

**Data structure useful to store values with the ability of O(log(n)) complexity search, stores data in order**

4. **Binary Tree**: Class implementation for a binary tree data structure that includes methods for inserting nodes, searching for a node, and traversing the tree (in-order, pre-order, post-order).

**Graphs in data structures are non-linear data structures made up of a finite number of nodes or vertices and the edges that connect them.**

5. **Graph**: Class implementation for a graph data structure. Includes methods for adding vertices and edges, performing depth-first search (DFS), and breadth-first search (BFS).
It uses dependency injection in order to provide ability to change class for Edges creation.

**Graph that are able to perform dijkstra search and store edges with weights for a vertex**

6. **WeightedGraph**: Class that extends Graph data structure. Changes Edge class for WeightedEdge in order to provide weights to edges.
Implements dijkstra shortest path search.

**Data structure that creates opportunity to add and remove elements from both ends with O(1) complexity**

7. **Linked List**: Class implementation for a singly linked list data structure. Include methods for inserting nodes, deleting nodes, and searching for a node.

### **Algorithmic Problems**

1. **Min/Max Stack**: Created a class described above, in order to get min and max values from stack with O(1) complexity 
2. **Binary Search Tree**: created isBinarySearchTree function in that takes binary tree root or any other tree point as a parameter
and checks if it satisfies binary search tree.
3. **Graph Algorithms**: Implemented DFS and BFS searching algorithms in Graph class. Implemented dijkstra algorithm in WeighedGraph that extends Graph class. Those classes are described above.
4. **Linked List Cycle**: Implemented a function to detect if a linked list has a cycle.
This function is called hasCycle and uses Floyd's Cycle Detection Algorithm in order to solve this problem efficiently.