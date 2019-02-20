const breadthFirstSearch = require("./breadth-first-search");

class Tree {
  /**
   * Build a new tree structure.
   */
  constructor() {
    this.root = null;
  }

  /**
   * Get all the nodes of the tree as an array.
   * @param   {Function} [traversal]  The function to go through the tree
   * @return  {Array}                 All the nodes as an array
   */
  getNodes(traversal = breadthFirstSearch) {
    const nodes = [];

    traversal(node => {
      nodes.push(node);
    }, this.root);

    return nodes;
  }

  /**
   * Get the size of the tree.
   * @param   {Function}  [traversal]   The function to go through the trees
   * @return  {Number}                  The total of nodes in the tree
   */
  size(traversal = breadthFirstSearch) {
    let total = 0;

    traversal(() => {
      total++;
    }, this.root);

    return total;
  }

  /**
   * Get the height of the tree.
   * @return {Number}  The maximum height of the tree.
   */
  getHeight() {
    if (this.root === null || this.root === undefined) {
      return 0;
    }

    return branchHeight(this.root);
  }

  /**
   * Find a node in the tree.
   * @param   {String|Number} id          The node id.
   * @param   {Function}      traversal   The function to go through the tree
   * @return  {TreeNode}                  The searched node
   */
  findNode(id, traversal = breadthFirstSearch) {
    let node = null;
    const callback = function(n) {
      if (n.id === id) {
        node = n;
      }
    };

    traversal(callback, this.root);

    return node;
  }

  /**
   * Add a node to the tree.
   * @param	{TreeNode}  node 		    The new node.
   * @param	{String} 	  parentId 	  The parent node id.
   * @param {Function}  traversal   The function to go through the tree
   */
  addNode(node, parentId, traversal = breadthFirstSearch) {
    const parent = this.findNode(parentId, traversal);

    if (parent) {
      parent.addChild(node);
    } else {
      throw new Error("Cannot add to non existing node.");
    }
  }

  /**
   * Add to move a node in the tree.
   * @param	{String}    id 				    The node to move.
   * @param {String} 	  parentId 			The new node's parent id
   * @param {Boolean}   keepChildren 	Whether or not the children should be kept and linked to the new parent.
   * @param {Function}  traversal     The function to go through the tree
   */
  moveNode(id, parentId, keepChildren = false, traversal = breadthFirstSearch) {
    const node = this.findNode(id, traversal);
    const newParent = this.findNode(parentId, traversal);
    let child = null;

    if (node.hasParents()) {
      if (!keepChildren) {
        while (node.hasChildren()) {
          child = node.children[0];

          for (let i = 0, l = node.parents.length; i < l; i++) {
            child.addParent(node.parents[i]);
          }

          node.removeChild(child);
        }
      }

      while (node.hasParents()) {
        node.removeParent(node.parents[0]);
      }

      node.addParent(newParent);
    } else {
      throw new Error("Cannot move root node.");
    }
  }

  /**
   * Remove a node from the tree.
   * @param	  {Node} 		  id 				    The node id.
   * @param 	{Boolean}   keepChildren 	Whether or not the children should be kept and linked to the new parent.
   * @param   {Function}  traversal     The function to go through the tree
   * @return 	{Node} 						        The removed node.
   */
  removeNode(id, keepChildren = false, traversal = breadthFirstSearch) {
    const nodeToRemove = this.findNode(id, traversal);

    if (!nodeToRemove) {
      throw new Error("Cannot remove non existing node.");
    }

    const { parents } = nodeToRemove;
    let child = null;

    if (nodeToRemove.hasParents()) {
      if (keepChildren) {
        if (nodeToRemove.hasChildren()) {
          child = nodeToRemove.children[0];

          for (let i = 0, l = parents.length; i < l; i++) {
            child.addParent(parents[i]);
          }

          nodeToRemove.removeChild(child);
        }
      }

      while (nodeToRemove.hasParents()) {
        parents[0].removeChild(nodeToRemove);
      }
    } else {
      throw new Error("Cannot remove root node.");
    }

    return nodeToRemove;
  }

  /**
   * Get all node of a branch.
   * @param	{Array}		branch 	The destination array.
   * @param	{Node} 		node 	The starting node.
   */
  getBranch(branch, node) {
    const callback = function(n) {
      branch.push(n);
    };

    breadthFirstSearch(callback, node);
  }

  /**
   * Print the tree in the console.
   */
  print() {
    recursePrint(this.root, "");
  }
}

function recursePrint(startingNode, prefix) {
  console.log(prefix + startingNode.title);
  for (let i = 0, { length } = startingNode.children; i < length; i++) {
    recursePrint(startingNode.childen[i], "\t" + prefix);
  }
}

/**
 * Go through each branch of the tree and compare their height to find the max
 * @param   {TreeNode}  startingNode  The starting node
 * @return  {Number}                  The maximum height of the tree.
 */
function branchHeight(startingNode) {
  if (!startingNode.hasChildren()) {
    return 1;
  }

  let maxHeight = 0;
  let lastHeight = 0;

  for (let i = 0, l = startingNode.children.length; i < l; i++) {
    lastHeight = branchHeight(startingNode.children[i]) + 1;

    if (lastHeight > maxHeight) {
      maxHeight = lastHeight;
    }
  }

  return maxHeight;
}

module.exports = Tree;
