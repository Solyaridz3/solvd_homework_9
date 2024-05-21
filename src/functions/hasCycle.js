// @ts-check
/**
 * Floyd's Cycle Detection Algorithm.
 * @param head - Linked List head.
 * @returns {boolean} - If Linked List has a cycle returns true, otherwise false.
 */
function hasCycle(head) {
    if (!head || !head.next) {
        return false;
    }

    let slow = head;
    let fast = head.next;

    while (slow !== fast) {
        if (!fast || !fast.next) {
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }

    return true;
}

export default hasCycle;
