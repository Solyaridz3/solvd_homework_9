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
    isEmpty() {
        return this.length === 0;
    }
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

    dequeue() {
        const currentHead = this.head;
        if (currentHead !== null) {
            this.head = currentHead.next ? currentHead.next : null;
            this.length--;
            return currentHead.element;
        }
        return null;
    }
    peek() {
        return this.head.element;
    }

    _print() {
        if (this.head === null || this.tail === null) {
            return console.log("Queue is empty");
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


