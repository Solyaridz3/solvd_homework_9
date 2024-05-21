import { BinaryTree } from "../BinaryTree.js";

const binaryTree = new BinaryTree("Fifty", 50);
binaryTree.insert("Ten", 10);
binaryTree.insert("Four", 4);
binaryTree.insert("Twelve", 12);
binaryTree.insert("Fifty One", 51);
binaryTree.insert("Ninety Nine", 99);

console.log("Search:", binaryTree.find(12));

// Traversal example
function arrayCreator() {
    let arr = [];
    return (e = null) => {
        if (e !== null) {
            arr.push(e);
        } else {
            return arr;
        }
    };
}


const createArr = arrayCreator();
binaryTree.inOrderTraversal(createArr);
const arr = createArr();
console.log("\narray created using inOrderTraversal:", arr);

console.log('\nPreOrder Traversal \n');
binaryTree.preOrderTraversal(console.log);

console.log('\nPostOrderTraversal\n')

binaryTree.postOrderTraversal(console.log);
