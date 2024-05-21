//@ts-check
class TreeNode {
    /**
     * Initializes a new instance of the TreeNode class.
     *
     * @param {any} element - The element associated with the node.
     * @param {number} key - The key associated with the node.
     */
    constructor(element, key) {
        this.element = element;
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

export class BinaryTree {
    /**
     * @param {string} element
     * @param {number} key
     */
    _root;
    /**
     * Initializes a new instance of the BinaryTree class with the specified element and key.
     *
     * @param {any} element - The element to be associated with the root node of the binary tree.
     * @param {number} key - The key to be associated with the root node of the binary tree.
     */
    constructor(element, key) {
        this._root = new TreeNode(element, key);
    }

    /**
     * Inserts a new element with the given key into the binary tree.
     *
     * @param {any} element - The element to be inserted.
     * @param {number} key - The key to be associated with the element.
     * @return {void} This function does not return anything.
     */
    insert(element, key) {
        this._insert(element, key, this._root);
    }

    /**
     * Inserts a new element with the given key into the binary tree.
     *
     * @param {any} element - The element to be inserted.
     * @param {number} key - The key to be associated with the element.
     * @param {TreeNode} currentPoint - The current node in the binary tree.
     * @return {void} This function does not return anything.
     */
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
    /**
     * Finds and returns the element with the specified key in the binary tree.
     *
     * @param {number} key - The key to search for.
     * @return {any} The element with the specified key, or null if not found.
     */
    find(key) {
        return this._find(key, this._root);
    }

    /**
     * Finds and returns the element with the specified key in the binary tree.
     *
     * @param {number} key - The key to search for.
     * @param {TreeNode} currentPoint - The current node in the binary tree.
     * @return {any} The element with the specified key, or null if not found.
     */
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
    /**
     * Performs an in-order traversal of the binary tree and applies the provided callback function to each node.
     *
     * @param {function} callback - The callback function to be applied to each node.
     * @return {void} This function does not return anything.
     */
    inOrderTraversal(callback) {
        this._inOrderTraversal(this._root, callback);
    }

    /**
     * Performs an in-order traversal of a binary tree recursively, starting from the given node,
     * and applies the provided callback function to each visited node.
     *
     * @param {TreeNode} currentPoint - The current node in the binary tree.
     * @param {function} callback - The callback function to be applied to each visited node.
     * @return {void} This function does not return anything.
     */
    _inOrderTraversal(currentPoint, callback) {
        if (currentPoint !== null) {
            this._inOrderTraversal(currentPoint.left, callback);
            callback(currentPoint);
            this._inOrderTraversal(currentPoint.right, callback);
        }
    }
    /**
     * Performs a pre-order traversal of the binary tree and applies the provided callback function to each node.
     *
     * @param {function} callback - The callback function to be applied to each node.
     * @return {void} This function does not return anything.
     */
    preOrderTraversal(callback) {
        this._preOrderTraversal(this._root, callback);
    }

    /**
     * Performs a pre-order traversal of a binary tree recursively, starting from the given node,
     * and applies the provided callback function to each visited node.
     *
     * @param {TreeNode} currentPoint - The current node in the binary tree.
     * @param {function} callback - The callback function to be applied to each visited node.
     * @return {void} This function does not return anything.
     */
    _preOrderTraversal(currentPoint, callback) {
        if (currentPoint !== null) {
            callback(currentPoint);
            this._preOrderTraversal(currentPoint.left, callback);
            this._preOrderTraversal(currentPoint.right, callback);
        }
    }

    /**
     * Performs a post-order traversal of the binary tree and applies the provided callback function to each node.
     *
     * @param {function} callback - The callback function to be applied to each node.
     * @return {void} This function does not return anything.
     */
    postOrderTraversal(callback) {
        this._postOrderTraversal(this._root, callback);
    }

    /**
     * Performs a post-order traversal of a binary tree recursively, starting from the given node,
     * and applies the provided callback function to each visited node.
     *
     * @param {TreeNode} currentPoint - The current node in the binary tree.
     * @param {function} callback - The callback function to be applied to each visited node.
     * @return {void} This function does not return anything.
     */
    _postOrderTraversal(currentPoint, callback) {
        if (currentPoint !== null) {
            this._postOrderTraversal(currentPoint.left, callback);
            this._postOrderTraversal(currentPoint.right, callback);
            callback(currentPoint);
        }
    }
}

