//@ts-check
import { Queue } from "../Queue.js";
const q = new Queue();

q.enqueue(1);
q.enqueue(['a', ['a', 'b', 'c']]);
q.enqueue(-1);


console.log("Peek:", q.peek());

while (!q.isEmpty()) {
    console.log("Dequeued:", q.dequeue());
    console.log(q.length);
}

console.log("Is empty:", q.isEmpty());
