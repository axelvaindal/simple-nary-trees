const TreeNode = require("../src/tree-node");

describe("TreeNode", () => {
  test("Instanciate should provide a node with default value", () => {
    const node = new TreeNode("some-id");

    expect(node.id).toBe("some-id");
    expect(node.children.length).toBe(0);
    expect(node.parents.length).toBe(0);
  });

  test("hasChildren should return true when node has children", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");

    node.addChild(child);

    expect(node.hasChildren()).toBe(true);
    expect(child.hasChildren()).toBe(false);
  });

  test("hasParents should return true when node has parent", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");

    node.addChild(child);

    expect(node.hasParents()).toBe(false);
    expect(child.hasParents()).toBe(true);
  });

  test("isRoot should return true when node does not have a parent", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");

    node.addChild(child);

    expect(node.isRoot()).toBe(true);
    expect(child.isRoot()).toBe(false);
  });

  test("isBrother should return true when a node is a brother of another", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");
    const brother = new TreeNode("some-brother");

    node.addChild(child);
    node.addChild(brother);

    expect(child.isBrother(brother)).toBe(true);
    expect(child.isBrother(node)).toBe(false);
  });

  test("isParent should return true when a node is a parent of another and false otherwise", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");
    const notChild = new TreeNode("not-child");

    node.addChild(child);

    expect(node.isParent(child)).toBe(true);
    expect(node.isParent(notChild)).toBe(false);
  });

  test("isChild should return true when a node is a child of another", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");

    node.addChild(child);

    expect(child.isChild(node)).toBe(true);
    expect(node.isChild(child)).toBe(false);
  });

  test("addChild should throw when added node is not a TreeNode", () => {
    const node = new TreeNode("some-id");
    const wrongChild = "titi";

    expect(() => {
      node.addChild(wrongChild);
    }).toThrow("child must be an instance of TreeNode");
  });

  test("addChild should add a new child to specified node if not existing", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");

    node.addChild(child);
    node.addChild(child);

    expect(node.children[0].id).toBe(child.id);
    expect(child.parents[0].id).toBe(node.id);
    expect(node.children.length).toBe(1);
  });

  test("addChildren should call addChild for each children to add", () => {
    const node = new TreeNode("some-id");
    node.addChild = jest.fn(() => {});

    node.addChildren(["child1", "child2"]);
    expect(node.addChild).toHaveBeenCalledTimes(2);
  });

  test("addParent should throw when added node is not a TreeNode", () => {
    const node = new TreeNode("some-id");
    const wrongParent = "titi";

    expect(() => {
      node.addParent(wrongParent);
    }).toThrow("parent must be an instance of TreeNode");
  });

  test("addParent should add a new parent to specified node if not existing", () => {
    const node = new TreeNode("some-id");
    const parent = new TreeNode("some-parent");

    node.addParent(parent);
    node.addParent(parent);

    expect(node.parents[0].id).toBe(parent.id);
    expect(parent.children[0].id).toBe(node.id);
    expect(node.parents.length).toBe(1);
  });

  test("removeChild should remove a child from specified node if existing", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");

    node.addChild(child);
    node.removeChild(child);
    node.removeChild(child);

    expect(node.children[0]).toBe(undefined);
    expect(child.parents[0]).toBe(undefined);
    expect(node.children.length).toBe(0);
  });

  test("removeChildren should remove list of child from specified node if existing", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");
    const child2 = new TreeNode("some-second-child");

    node.addChild(child);
    node.addChild(child2);
    node.removeChildren([child, child2]);

    expect(node.children[0]).toBe(undefined);
    expect(child.parents[0]).toBe(undefined);
    expect(child2.parents[0]).toBe(undefined);
    expect(node.children.length).toBe(0);
  });

  test("removeAllChildren should remove every child from specified node if any", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");
    const child2 = new TreeNode("some-second-child");

    node.addChild(child);
    node.addChild(child2);
    node.removeAllChildren();

    expect(node.children[0]).toBe(undefined);
    expect(child.parents[0]).toBe(undefined);
    expect(child2.parents[0]).toBe(undefined);
    expect(node.children.length).toBe(0);
  });

  test("removeParent should remove a parent from specified node if existing", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");

    node.addChild(child);
    child.removeParent(node);
    child.removeParent(node);

    expect(node.children[0]).toBe(undefined);
    expect(child.parents[0]).toBe(undefined);
    expect(child.parents.length).toBe(0);
  });

  test("removeParents should remove list of parents from specified node if existing", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");
    const parent2 = new TreeNode("some-second-parent");

    node.addChild(child);
    parent2.addChild(child);
    child.removeParents([node, parent2]);

    expect(node.children[0]).toBe(undefined);
    expect(child.parents[0]).toBe(undefined);
    expect(parent2.children[0]).toBe(undefined);
    expect(child.parents.length).toBe(0);
  });

  test("removeAllParents should remove every parent from specified node if any", () => {
    const node = new TreeNode("some-id");
    const child = new TreeNode("some-child");
    const parent2 = new TreeNode("some-second-parent");

    node.addChild(child);
    parent2.addChild(child);
    child.removeAllParents();

    expect(node.children[0]).toBe(undefined);
    expect(child.parents[0]).toBe(undefined);
    expect(parent2.children[0]).toBe(undefined);
    expect(child.parents.length).toBe(0);
  });
});
