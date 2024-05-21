import { BinaryTree } from "../BinaryTree.js";
import isBinarySearchTree from "../functions/isBinarySearchTree.js";

const binaryTree = new BinaryTree("Fifty", 50);
binaryTree.insert("Ten", 10);
binaryTree.insert("Four", 4);
binaryTree.insert("Twelve", 12);
binaryTree.insert("Fifty One", 51);
binaryTree.insert("Ninety Nine", 99);

console.log('Whether tree is BST:', isBinarySearchTree(binaryTree._root));

console.log("Search:", binaryTree.find(12));

// Traversal example
function arrayCreator() {
    let arr = [];
    return (node = null) => {
        if (node !== null) {
            arr.push(node.element);
        } else {
            return arr;
        }
    };
}

const createArr = arrayCreator();
binaryTree.inOrderTraversal(createArr);
const arr = createArr();
console.log("\narray created using inOrderTraversal:", arr);

console.log("\nPreOrder Traversal \n");
binaryTree.preOrderTraversal(({ element }) => console.log(element));

console.log("\nPostOrderTraversal\n");

binaryTree.postOrderTraversal(({ element }) => console.log(element));
