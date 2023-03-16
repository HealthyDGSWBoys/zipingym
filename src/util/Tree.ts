export default class Tree<T> {
  public value: T;
  public parentNode: Tree<T>;
  public childNode: Array<Tree<T>> = new Array();
  constructor(value: T, parent?: Tree<T>) {
    this.value = value;
    this.parentNode = parent ?? this;
  }

  public appendChild(value: Tree<T>) {
    this.childNode.push(value);
  }

  public isRootNode() {
    return this === this.parentNode;
  }
}
