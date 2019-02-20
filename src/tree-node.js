class TreeNode {
  /**
   * Build a new node for tree structure.
   * @param {String|Number} id  The id of the node
   */
  constructor(id) {
    this.children = [];
    this.parents = [];
    this.id = id;
  }

  /**
   * Evaluate if the node has children.
   * @return   {Boolean}   True if the node has children, false otherwise.
   */
  hasChildren() {
    return this.children.length > 0;
  }

  /**
   * Evaluate if the node has parents.
   * @return   {Boolean}   True if the node has parents, false otherwise.
   */
  hasParents() {
    return this.parents.length > 0;
  }

  /**
   * Evaluate if the node is the root of its tree.
   * @return   {Boolean}   True if the node is root, false otherwise.
   */
  isRoot() {
    return this.hasParents() === false;
  }

  /**
   * Evaluate if a specified node is a brother.
   * @param   {TreeNode}  node  The specified node
   * @return  {Boolean}         True if the node has the same parent, false otherwise.
   */
  isBrother(node) {
    for (let i = 0; i < this.parents.length; i++) {
      for (let j = 0; j < node.parents.length; j++) {
        if (this.parents[i] === node.parents[j]) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Evaluate if this node is parent of a specified one.
   * @param   {TreeNode}  node  The specified node
   * @return  {Boolean}         True if node is the child, false otherwise.
   */
  isParent(node) {
    for (let i = 0; i < node.parents.length; i++) {
      if (node.parents[i].id === this.id) {
        return true;
      }
    }

    return false;
  }

  /**
   * Evaluate if this node is a child of a specified one.
   * @param   {TreeNode}  node  The specified node
   * @return  {Boolean}         True if node is the parent, false otherwise.
   */
  isChild(node) {
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].id === this.id) {
        return true;
      }
    }

    return false;
  }

  /**
   * Add a new child to a node.
   * @param    {TreeNode}  child   The child node to add
   */
  addChild(child) {
    if (!(child instanceof TreeNode)) {
      throw new TypeError("child must be an instance of TreeNode");
    }

    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].id === child.id) {
        return;
      }
    }

    this.children.push(child);
    child.parents.push(this);
  }

  /**
   * Add multiple children to a node.
   * @param    {Array}  children   The children nodes to add.
   */
  addChildren(children) {
    for (const child of children) {
      this.addChild(child);
    }
  }

  /**
   * Add a parent to a node.
   * @param    {Node}  parent      The parent node to add.
   */
  addParent(parent) {
    if (!(parent instanceof TreeNode)) {
      throw new TypeError("parent must be an instance of TreeNode");
    }

    for (let i = 0; i < this.parents.length; i++) {
      if (this.parents[i].id === parent.id) {
        return;
      }
    }

    this.parents.push(parent);
    parent.children.push(this);
  }

  /**
   * Remove a child from a node.
   * @param {Node} child The child node to remove.
   */
  removeChild(child) {
    const childIndex = getChildIndex(this, child.id);

    if (childIndex < 0) {
      return;
    }

    this.children.splice(childIndex, 1);
    child.parents.splice(getParentIndex(child, this.id), 1);
  }

  /**
   * Remove multiple children from a node.
   * @param {Array} children An array of all children node to remove.
   */
  removeChildren(children) {
    for (const child of children) {
      this.removeChild(child);
    }
  }

  /**
   * Remove all children from a node.
   */
  removeAllChildren() {
    let child = null;
    while (this.hasChildren()) {
      child = this.children.splice(0, 1);
      child[0].parents.splice(getParentIndex(child[0], this.id), 1);
    }
  }

  /**
   * Remove a parent from a node.
   * @param {Node} parent The parent node to remove.
   */
  removeParent(parent) {
    const parentIndex = getParentIndex(this, parent.id);

    if (parentIndex < 0) {
      return;
    }

    this.parents.splice(parentIndex, 1);
    parent.children.splice(getChildIndex(parent, this.id), 1);
  }

  /**
   * Remove multiple parents from a node.
   * @param {Array} parents An array of all parents node to remove.
   */
  removeParents(parents) {
    for (const parent of parents) {
      this.removeParent(parent);
    }
  }

  /**
   * This function is used in order to remove all parents from a node.
   */
  removeAllParents() {
    let parent = null;
    while (this.hasParents()) {
      parent = this.parents.splice(0, 1);
      parent[0].children.splice(getChildIndex(parent[0], this.id), 1);
    }
  }
}

/**
 * Get the index of a child node.
 * @param   {TreeNode}  node  The node to explore
 * @param   {String}    id    The id of the child node to find
 * @return  {Number}          The index of found node or -1 if not found
 */
function getChildIndex(node, id) {
  const { children } = node;
  for (let i = 0, l = children.length; i < l; i++) {
    if (id === children[i].id) {
      return i;
    }
  }

  return -1;
}

/**
 * Get the index of a parent node.
 * @param   {TreeNode}  node  The node to explore
 * @param   {String}    id    The id of the parent node to find
 * @return  {Number}          The index of found node or -1 if not found
 */
function getParentIndex(node, id) {
  const { parents } = node;
  for (let i = 0, l = parents.length; i < l; i++) {
    if (id === parents[i].id) {
      return i;
    }
  }

  return -1;
}

module.exports = TreeNode;
