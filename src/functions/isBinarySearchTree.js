/**
 * Checks if a binary tree is a binary search tree.
 *
 * @param {TreeNode} root - The root node of the binary tree.
 * @return {boolean} Returns true if the binary tree is a binary search tree, false otherwise.
 */
function isBinarySearchTree(root) {
    function checker(currentPoint, previousKey) {
        if (!currentPoint) {
            return true;
        }
        if (!checker(currentPoint.left, previousKey)) {
            return false;
        }
        if (currentPoint.key < previousKey) {
            return false;
        }
        return checker(currentPoint.right, currentPoint.key);
    }
    return checker(root, -Infinity);
}

export default isBinarySearchTree;
