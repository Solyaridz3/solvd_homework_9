//@ts-check
export class Stack {
    constructor() {
        this._items = [];
    }

    pop() {
        return this._items.pop();
    }
    push(element) {
        this._items.push(element);
        return this;
    }

    peek() {
        return this._items[this._items.length - 1];
    }
}

export class MinMaxStack extends Stack {
    constructor() {
        super();
        this._maxStack = [];
        this._minStack = [];
    }

    getMax() {
        return this._maxStack[this._maxStack.length - 1];
    }

    getMin() {
        return this._minStack[this._minStack.length - 1];
    }

    pop() {
        const poppedElement = super.pop();
        if (poppedElement === this.getMax()) {
            this._maxStack.pop();
        }
        if (poppedElement === this.getMin()) {
            this._minStack.pop();
        }
        return poppedElement;
    }

    push(element) {
        super.push(element);
        
        if (this._maxStack.length === 0 || element >= this.getMax()) {
            this._maxStack.push(element);
        }

        if (this._minStack.length === 0 || element <= this.getMin()) {
            this._minStack.push(element);
        }

        return this;
    }
}

