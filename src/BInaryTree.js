//@ts-check
class TreeNode {
    constructor(element, key) {
        this.element = element;
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    /**
     * @param {string} element
     * @param {number} key
     */
    _root;
    constructor(element, key) {
        this._root = new TreeNode(element, key);
    }

    insert(element, key) {
        this._insert(element, key, this._root);
    }

    _insert(element, key, currentPoint) {
        if (key > currentPoint.key) {
            if (currentPoint.right === null) {
                currentPoint.right = new TreeNode(element, key);
            } else {
                this._insert(element, key, currentPoint.right);
            }
        } else if (key < currentPoint.key) {
            if (currentPoint.left === null) {
                currentPoint.left = new TreeNode(element, key);
            } else {
                this._insert(element, key, currentPoint.left);
            }
        }
    }
    find(key) {
        return this._find(key, this._root);
    }

    _find(key, currentPoint) {
        if (key === currentPoint.key) {
            return currentPoint.element;
        } else if (key > currentPoint.key) {
            if (currentPoint.right === null) {
                return null;
            }
            return this._find(key, currentPoint.right);
        } else if (key < currentPoint.key) {
            if (currentPoint.left === null) {
                return null;
            }
            return this._find(key, currentPoint.left);
        }
    }
    inOrderTraversal(callback) {
        this._inOrderTraversal(this._root, callback);
    }

    _inOrderTraversal(currentPoint, callback) {
        if (currentPoint !== null) {
            this._inOrderTraversal(currentPoint.left, callback);
            callback(currentPoint.element);
            this._inOrderTraversal(currentPoint.right, callback);
        }
    }
    preOrderTraversal(callback) {
        this._preOrderTraversal(this._root, callback);
    }

    _preOrderTraversal(currentPoint, callback) {
        if (currentPoint !== null) {
            callback(currentPoint.element);
            this._preOrderTraversal(currentPoint.left, callback);
            this._preOrderTraversal(currentPoint.right, callback);
        }
    }

    postOrderTraversal(callback) {
        this._postOrderTraversal(this._root, callback);
    }

    _postOrderTraversal(currentPoint, callback) {
        if (currentPoint !== null) {
            this._postOrderTraversal(currentPoint.left, callback);
            this._postOrderTraversal(currentPoint.right, callback);
            callback(currentPoint.element);
        }
    }
}

const binaryTree = new BinaryTree("Fifty", 50);
binaryTree.insert("Ten", 10);
binaryTree.insert("Four", 4);
binaryTree.insert("Twelve", 12);
binaryTree.insert("Fifty One", 51);
binaryTree.insert("Ninety Nine", 99);

console.log("Found:", binaryTree.find(12));

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
console.log("arr is:", arr);
binaryTree.preOrderTraversal(console.log);
