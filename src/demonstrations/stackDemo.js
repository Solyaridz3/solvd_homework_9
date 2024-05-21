import { Stack, MinMaxStack } from "../Stack.js";

let stack = new MinMaxStack();
stack.push(1);
stack.push(2);
stack.push(3);

console.log("Max:", stack.getMax());
console.log("Min:", stack.getMin());

console.log("Popped:", stack.pop());

console.log("Max:", stack.getMax());
console.log("Min:", stack.getMin());