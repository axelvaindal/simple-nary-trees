# simple-nary-trees

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![npm version](https://badge.fury.io/js/simple-nary-trees.svg)](https://badge.fury.io/js/simple-nary-trees)
[![Build Status](https://travis-ci.com/M4dNation/simple-nary-trees.svg?branch=master)](https://travis-ci.com/M4dNation/simple-nary-trees) ![](https://david-dm.org/M4dNation/simple-nary-trees.svg) [![codecov](https://codecov.io/gh/M4dNation/simple-nary-trees/branch/develop/graph/badge.svg)](https://codecov.io/gh/M4dNation/simple-nary-trees)

## About

`simple-nary-trees` is a package for creating a nary-tree structure.  
It provides two classes `Tree` and `TreeNode` you can instanciate and populate with any data you want.

## Install

`npm install --save simple-nary-trees`  
`yarn add simple-nary-trees`

## Usage

`simple-nary-trees` exports a `Tree` and a `TreeNode` classes you can import:

```javascript
// ES6
import { Tree, TreeNode } from "simple-nary-trees";

// ES5
const Tree = require("simple-nary-trees").Tree;
const TreeNode = require("simple-nary-trees").TreeNode;
```

Once imported, you just have to instanciate a Tree and add data to have an usable tree structure.

```javascript
import { Tree } from "simple-nary-trees";

const tree = new Tree();
const node = new TreeNode("node-id");
const secondNode = new TreeNode("second-id");

tree.root = node;
tree.addNode(secondNode, "node-id");
```

We do suggest you extends the TreeNode class to create your own representation of a tree node.
The common pattern is the following:

```javascript
import { TreeNode } from "simple-nary-trees";

class MyTreeNode extends TreeNode {
  constructor({ id, name }) {
    super(id);

    // You can use whatever suits you for your data
    this.name = name;
  }
}
```

## Authors

`simple-nary-trees` is maintained by M4dNation Company.  
First version written by [axelvaindal](https://github.com/axelvaindal).

## Contributors

There is actually no other contributors for this project.
If you want to contribute, feel free to make any suggestions or to contact us.

### Contributing to the package

We try to keep `simple-nary-trees` as simple as possible.  
Before proposing a PR or opening an issue, please keep in mind :

    - This package is meant to be as simple as possible
    - This package tries to respect the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
    - This package tries to use the minimum of dependencies possible

Taking into account the previous points leads us to **NOT** merge proposed pull-request if those :

    - Integrate changes that are too far from the initial purpose of the package
    - Integrate changes that are adding additional dependencies
    - Integrate changes that are not unit tested and motivationated

This being said, we **really** welcome pull-request and bug report, so feel free to start a contribution.

Moreover, Pull Requests should always come with related unit tests, and won't be considered if tests aren't included.

### Testing

`simple-nary-trees` uses jest for unit testing.  
If you don't know about jest yet, you can check out their [documentation](https://jestjs.io/en/).

To run the tests, just run :

`yarn test`

Note that we are using [codecov](https://codecov.io) to keep track of code coverage related to our tests and you shouldn't affect negatively the current coverage of the code by removing tests or not covering new features with new unit tests.

## Licence

`simple-nary-trees` is available under the terms of the MIT LICENSE.  
Check the licence file for more information.
