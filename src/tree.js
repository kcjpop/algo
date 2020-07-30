class Node {
  constructor(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

/**
 * Check if a node is a leaf node
 */
function isLeaf(node) {
  return node.left === null && node.right === null
}

/**
 * Add a new value to a tree
 */
function add(root, value) {
  const node = new Node(value)

  if (value === root.value) {
    throw new Error(`There is already ${value} in the tree`)
  }

  // If the node's value is greater than to root's value, add to the right
  if (value > root.value) {
    if (root.right === null) {
      root.right = node
      return root
    }
    return add(root.right, value)
  }

  // Otherwise, add to the left
  if (root.left === null) {
    root.left = node
    return root
  }
  return add(root.left, value)
}

/**
 * Search for a value in a tree
 */
function search(root, value) {
  // We have reached the leaf node and still haven't found our value
  if (root === null) return false

  // If the current node is what we're looking for, return true
  if (root.value === value) return true

  // So the current node doesn't contain our value, we need to find in its
  // branches. Let's start with the right branch
  if (value > root.value) return search(root.right, value)

  // Otherwise, search in the left branch
  return search(root.left, value)
}

/**
 * Find the furthest node on the right
 */
function findMax(node) {
  if (node.right === null) return node

  return findMax(node.right)
}

/**
 * Find the furthest node on the left
 */
function findMin(node) {
  if (node.left === null) return node

  return findMin(node.left)
}

/**
 * Find the height of a node, which is number of edges from the node to its
 * deepest leaf
 */
function height(node) {
  const aux = (node, count) => {
    if (node === null || isLeaf(node)) return count

    return Math.max(aux(node.left, count + 1), aux(node.right, count + 1))
  }

  return aux(node, 0)
}

/**
 * Remove a value from a tree
 */
function remove(root, value) {
  // Find the node and it parents
  const find = (root, value, parent = null) => {
    if (root === null) return []

    if (root.value === value) return [root, parent]

    if (value > root.value) return find(root.right, value, root)

    return find(root.left, value, root)
  }

  const aux = (root, node, parent) => {
    // If the node to be removed is a leaf
    if (isLeaf(node)) {
      // Check if it's on the right of its parent
      if (node.value > parent.value) parent.right = null
      else parent.left = null

      return root
    }

    // If the node has 2 chilren
    if (node.left !== null && node.right !== null) {
      // Find maximum of the left
      const max = findMax(node.left)

      // Assign the whole right branch of to-be-deleted node to max
      max.right = node.right

      // Connect right branch of parent node to the left branch of node to be deleted
      parent.right = node.left

      return root
    }

    // If it has only one child
    if (node.left !== null) {
      parent.left = node.left
      return root
    }

    if (node.right !== null) {
      parent.right = node.right
      return root
    }
  }

  const [node, parent] = find(root, value)
  if (node) return aux(root, node, parent)
}

/**
 * Rotate the tree to the right
 *      b             a
 *     / \           / \
 *    a   e   ===>  c   b
 *   / \               / \
 *  c   d             d   e
 */
function rotateRight(node) {
  const copy = { ...node }
  node.left = copy.left.right
  copy.left.right = node

  return copy.left
}

/**
 * Rotate a tree to the left
 *     a                 b
 *    / \               / \
 *   c   b     ===>    a   e
 *      / \           / \
 *     d   e         c   d
 */
function rotateLeft(node) {
  const copy = { ...node }
  node.right = copy.right.left
  copy.right.left = node

  return copy.right
}

module.exports = {
  Node,
  add,
  isLeaf,
  search,
  remove,
  findMax,
  findMin,
  height,
  rotateLeft,
  rotateRight,
}
