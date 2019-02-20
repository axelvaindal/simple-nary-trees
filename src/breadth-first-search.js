const { Queue } = require("simple-queues");

/**
 * Traverse a tree with breadth-first search.
 * Apply a callback method to every visited node in the process.
 * @param	{Function}	callback	The function to apply to every visited node during search.
 * @param	{Node} 		entryNode 	The starting node of the traversal
 */
function breadthFirstSearch(callback, entryNode) {
  const queue = new Queue();

  queue.enqueue(entryNode);
  let currentTree = queue.dequeue();

  while (currentTree) {
    for (let i = 0, { length } = currentTree.children; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }

    callback(currentTree);

    currentTree = queue.dequeue();
  }
}

module.exports = breadthFirstSearch;
