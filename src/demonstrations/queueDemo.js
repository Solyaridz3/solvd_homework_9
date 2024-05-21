//@ts-check
import { Queue } from "../Queue.js";
const q = new Queue();

q.enqueue(1);
q.enqueue(0);
q.enqueue(-1);


console.log("Peek:", q.peek());

while (!q.isEmpty()) {
    console.log("Dequeued:", q.dequeue());
}

console.log("Is empty:", q.isEmpty());
