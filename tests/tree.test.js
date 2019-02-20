const Tree = require("../src/tree");
const TreeNode = require("../src/tree-node");

describe("Tree", () => {
  test("Instanciate should return an empty stack.", () => {
    const tree = new Tree();

    expect(tree).toBeInstanceOf(Tree);
    expect(tree.root).toBe(null);
    expect(tree.getHeight()).toBe(0);
  });

  test("Setting root node update tree height", () => {
    const tree = new Tree();

    tree.root = new TreeNode("root");

    expect(tree.getHeight()).toBe(1);
  });

  test("Getting nodes of a tree", () => {
    const tree = new Tree();

    tree.root = new TreeNode("root");

    const nodes = tree.getNodes();

    expect(nodes.length).toBe(1);
    expect(nodes[0].id).toBe("root");
  });

  test("Find a node in the tree", () => {
    const tree = new Tree();

    tree.root = new TreeNode("root");

    const node = tree.findNode("root");

    expect(node instanceof TreeNode).toBe(true);
    expect(node.id).toBe(tree.root.id);
  });

  test("Getting size of a tree", () => {
    const tree = new Tree();

    tree.root = new TreeNode("root");
    tree.addNode(new TreeNode("some-node"), "root");

    const size = tree.size();

    expect(size).toBe(2);
  });

  test("Adding to existing node should generate parent-child relation between nodes", () => {
    const tree = new Tree();

    tree.root = new TreeNode("root");
    const node = new TreeNode("some-node");

    tree.addNode(node, "root");

    expect(tree.root.children[0]).toMatchObject(node);
    expect(node.parents[0]).toMatchObject(tree.root);
  });

  test("Adding to non existing node should throw", () => {
    const tree = new Tree();

    tree.root = new TreeNode("root");
    const node = new TreeNode("some-node");

    expect(() => {
      tree.addNode(node, "undefined");
    }).toThrowError("Cannot add to non existing node.");
  });

  test("Trying to move root node should throw", () => {
    const tree = new Tree();
    const root = new TreeNode("root");
    tree.root = root;

    tree.addNode(new TreeNode("node"), "root");

    expect(() => {
      tree.moveNode("root", "node");
    }).toThrowError("Cannot move root node.");
  });

  test("Moving node without keep children should move a single node", () => {
    const tree = new Tree();

    const root = new TreeNode("root");
    const node1 = new TreeNode("node1");
    const node2 = new TreeNode("node2");

    root.addChild(node1);
    node1.addChild(node2);

    const node3 = new TreeNode("node3");

    root.addChild(node3);

    tree.root = root;

    tree.moveNode("node1", "node3");

    expect(root.children[0]).toMatchObject(node3);
    expect(root.children[1]).toMatchObject(node2);
    expect(node3.children[0]).toMatchObject(node1);
  });

  test("Moving node and keeping children should move the whole branch", () => {
    const tree = new Tree();

    const root = new TreeNode("root");
    const node1 = new TreeNode("node1");
    const node2 = new TreeNode("node2");

    root.addChild(node1);
    node1.addChild(node2);

    const node3 = new TreeNode("node3");

    root.addChild(node3);

    tree.root = root;

    tree.moveNode("node1", "node3", true);

    expect(root.children[0]).toMatchObject(node3);
    expect(root.children[1]).toBe(undefined);
    expect(node3.children[0]).toMatchObject(node1);
    expect(node1.children[0]).toMatchObject(node2);
  });

  test("Get branch should return every node in a branch", () => {
    const tree = new Tree();

    const root = new TreeNode("root");
    const node1 = new TreeNode("node1");
    const node2 = new TreeNode("node2");

    root.addChild(node1);
    node1.addChild(node2);

    const node3 = new TreeNode("node3");

    root.addChild(node3);

    tree.root = root;

    const branch = [];
    tree.getBranch(branch, node1);

    expect(branch.length).toBe(2);
    expect(branch[0]).toMatchObject(node1);
    expect(branch[1]).toMatchObject(node2);
  });

  test("Trying to remove non existing node should throw", () => {
    const tree = new Tree();
    const root = new TreeNode("root");
    tree.root = root;

    tree.addNode(new TreeNode("node"), "root");

    expect(() => {
      tree.removeNode("undefined");
    }).toThrowError("Cannot remove non existing node.");
  });

  test("Trying to remove root node should throw", () => {
    const tree = new Tree();
    const root = new TreeNode("root");
    tree.root = root;

    tree.addNode(new TreeNode("node"), "root");

    expect(() => {
      tree.removeNode("root");
    }).toThrowError("Cannot remove root node.");
  });

  test("Removing node and not keeping children should remove the whole branch", () => {
    const tree = new Tree();

    const root = new TreeNode("root");
    const node1 = new TreeNode("node1");
    const node2 = new TreeNode("node2");

    root.addChild(node1);
    node1.addChild(node2);

    const node3 = new TreeNode("node3");

    root.addChild(node3);

    tree.root = root;

    tree.removeNode("node1");

    expect(root.children.length).toBe(1);
    expect(root.children[0]).toMatchObject(node3);
  });

  test("Removing node and keeping children should move the remaining branch one way up", () => {
    const tree = new Tree();

    const root = new TreeNode("root");
    const node1 = new TreeNode("node1");
    const node2 = new TreeNode("node2");

    root.addChild(node1);
    node1.addChild(node2);

    const node3 = new TreeNode("node3");

    root.addChild(node3);

    tree.root = root;

    tree.removeNode("node1", true);

    expect(root.children[0]).toMatchObject(node3);
    expect(root.children[1]).toMatchObject(node2);
  });
});
