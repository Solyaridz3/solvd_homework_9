//@ts-check
export class Stack {
    constructor() {
        this._items = [];
    }

    /**
     * Removes and returns the last element from the stack.
     *
     * @return {*} The last element of the stack.
     */
    pop() {
        return this._items.pop();
    }
    /**
     * Adds an element to the top of the stack and returns the updated stack.
     *
     * @param {*} element - The element to be added to the stack.
     * @return {Stack} - The updated stack with the new element added.
     */
    push(element) {
        this._items.push(element);
        return this;
    }

    /**
     * Returns the last element from the stack without removing it.
     *
     * @return {*} The last element of the stack.
     */
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

    /**
     * Returns the maximum element from the stack.
     *
     * @return {*} The maximum element from the stack.
     */
    getMax() {
        return this._maxStack[this._maxStack.length - 1];
    }

    /**
     * Returns the minimum element from the stack.
     *
     * @return {*} The minimum element from the stack.
     */
    getMin() {
        return this._minStack[this._minStack.length - 1];
    }

    /**
     * Removes and returns the last element from the stack, updating the maximum and minimum stacks if necessary.
     *
     * @return {*} The last element of the stack.
     */
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

    /**
     * Adds an element to the top of the stack and updates the maximum and minimum stacks if necessary.
     *
     * @param {*} element - The element to be added to the stack.
     * @return {Stack} - The updated stack with the new element added.
     */
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

