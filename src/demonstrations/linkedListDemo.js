import { LinkedList } from "../LinkedList.js";


const linkedList = new LinkedList(1);
linkedList.append(2);
linkedList.append(4);
linkedList.append(10);
linkedList.append(20);
linkedList.append(3);
linkedList.prepend(0);
console.log('Whether linked list has cycle:', linkedList.hasCycle());
linkedList._print();

console.log('Searching for 0:', linkedList.find(0));

console.log('Deleting 2:', linkedList.delete(2));
linkedList._print();

console.log('Deleting 0:', linkedList.delete(0));

linkedList._print();

linkedList._print();
console.log('Deleting 3:', linkedList.delete(3));

console.log('Looking for 20:', linkedList.find(20));

