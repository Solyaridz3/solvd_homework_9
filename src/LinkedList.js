//@ts-check
export class ListNode {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor(value) {
        this.head = new ListNode(value);
        this.tail = this.head;
        this.length = 1;
    }

    append(element) {
        const newNode = new ListNode(element);
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this;
    }

    prepend(value) {
        const newNode = new ListNode(value);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return this;
    }
    get(position) {
        if (position > this.length) {
            throw new Error(`Position ${position} is out of length`);
        }

        let current = this.head;
        for (let i = 0; i < position; i++) {
            current = current.next;
        }
        return current;
    }

    find(element) {
        let current = this.head;
        while (current.element !== element && current.next) {
            current = current.next;
        }
        return current;
    }

    _print() {
        console.log(`HEAD: ${this.head.element}`);
        let currentNode = this.head;
        while (currentNode.next) {
            console.log(currentNode.element);
            currentNode = currentNode.next;
        }
        console.log(currentNode.element);
        console.log(`TAIL: ${this.tail.element}`);
    }
}
