//@ts-check
import { ListNode } from "./LinkedList.js";

// Linked List queue realization
// enqueue, dequeue complexity is O(1)
export class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Checks if the queue is empty.
     *
     * @return {boolean} True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return this.length === 0;
    }

    /**
     * Adds an element to the end of the queue.
     *
     * @param {*} element - The element to be added to the queue.
     * @return {Queue} - The updated queue.
     */
    enqueue(element) {
        const newNode = new ListNode(element);
        if (this.tail === null) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.length++;
        return this;
    }

    /**
     * Removes and returns the element at the front of the queue.
     *
     * @return {*} The element at the front of the queue, or null if the queue is empty.
     */
    dequeue() {
        const currentHead = this.head;
        if (currentHead !== null) {
            this.head = currentHead.next;
            this.length--;
            if (this.head === null) {
                this.tail = null;
            }
            return currentHead.element;
        }
        return null;
    }

    /**
     * Returns the element at the front of the queue without removing it.
     *
     * @return {*} The element at the front of the queue, or null if the queue is empty.
     */
    peek() {
        return this.head ? this.head.element : null;
    }

    /**
     * Prints the elements of the queue.
     */
    _print() {
        if (this.head === null) {
            console.log("Queue is empty");
            return;
        }
        console.log(`HEAD ${this.head.element}`);
        let currentNode = this.head;
        while (currentNode.next) {
            console.log(currentNode.element);
            currentNode = currentNode.next;
        }
        console.log(currentNode.element);
        console.log(`TAIL ${this.tail.element}`);
    }
}


