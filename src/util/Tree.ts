export class TreeNode<T> {
  val: T;
  children: TreeNode<T>[];

  constructor(val: T) {
    this.val = val;
    this.children = [];
  }

  addChild(child: TreeNode<T>) {
    this.children.push(child);
  }

  removeChild(child: TreeNode<T>) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  getChildren(): TreeNode<T>[] {
    return this.children;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }
}

export default class Tree<T> {
  root: TreeNode<T>;

  constructor(val: T) {
    this.root = new TreeNode(val);
  }

  get getRoot(): TreeNode<T> {
    return this.root;
  }

  traverseBFS(
    callback: (node: TreeNode<T>) => void,
    start: TreeNode<T> = this.root
  ) {
    const queue = [start];
    while (queue.length > 0) {
      const node = queue.shift()!;
      callback(node);
      node.getChildren().forEach((child) => queue.push(child));
    }
  }

  traverseDFS(
    callback: (node: TreeNode<T>) => void,
    start: TreeNode<T> = this.root
  ) {
    const traverse = (node: TreeNode<T>) => {
      callback(node);
      node.getChildren().forEach((child) => traverse(child));
    };
    traverse(start);
  }
  setRoot(node: TreeNode<T>) {
    this.root = node;
  }
  findChildrenAtDepth(depth: number): TreeNode<T>[] {
    let nodes = [this.root];
    for (let i = 0; i < depth; i++) {
      //@ts-ignore
      nodes = nodes.reduce((acc, node) => acc.concat(node.getChildren()), []);
    }
    return nodes;
  }
  getMaxDepth(node: TreeNode<T> = this.root): number {
    if (!node.hasChildren()) {
      return 1;
    }
    let maxDepth = 0;
    node.getChildren().forEach((child) => {
      const childDepth = this.getMaxDepth(child);
      if (childDepth > maxDepth) {
        maxDepth = childDepth;
      }
    });
    return maxDepth + 1;
  }
}
