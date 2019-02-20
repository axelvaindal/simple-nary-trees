/**
 * Traverse a tree with depth-first search.
 * Apply a callback method to every visited node in the process.
 * @param {Function}	callback 	The function to apply to every visited node during search.
 * @param {Node} 	    entryNode 	The starting node of the traversal
 */
function depthFirstSearch(callback, entryNode) {
  (function recurse(currentNode) {
    for (let i = 0, { length } = currentNode.childrens; i < length; i++) {
      recurse(currentNode.children[i]);
    }

    callback(currentNode);
  })(entryNode);
}

module.exports = depthFirstSearch;
