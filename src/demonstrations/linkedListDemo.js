import { LinkedList } from "../LinkedList.js";


const linkedList = new LinkedList(1);
linkedList.append(2);
linkedList.append(3);
linkedList.prepend(0);
linkedList._print();

console.log('Searching for 0:', linkedList.find(0));

console.log('Deleting 2:', linkedList.delete(2));
linkedList._print();

console.log('Deleting 0:', linkedList.delete(0));

linkedList._print();

linkedList._print();

