/* global test, expect */

const {
  Node,
  add,
  search,
  remove,
  findMax,
  findMin,
  height,
  rotateRight,
  rotateLeft,
} = require('./tree')

test('construct a new tree', () => {
  const t = new Node(5)
  expect(t.right).toBeNull()
  expect(t.left).toBeNull()

  const t_ = new Node(
    15,
    new Node(10),
    new Node(25, new Node(17, null, new Node(20)), new Node(30, new Node(28))),
  )

  expect(t_.value).toBe(15)
  expect(t_.left.value).toBe(10)
  expect(t_.right.value).toBe(25)
  expect(t_.right.left.value).toBe(17)
  expect(t_.right.left.left).toBeNull()
  expect(t_.right.left.right.value).toBe(20)
  expect(t_.right.right.value).toBe(30)
  expect(t_.right.right.left.value).toBe(28)
})

test('add new nodes to a tree', () => {
  const t = new Node(10)
  add(t, 4)
  add(t, 12)
  add(t, 25)

  expect(t.left.value).toBe(4)
  expect(t.right.value).toBe(12)
  expect(t.right.right.value).toBe(25)
})

test('search a value in a tree', () => {
  const t = new Node(15, new Node(10), new Node(20, new Node(18), new Node(22)))

  expect(search(t, 15)).toBe(true)
  expect(search(t, 22)).toBe(true)
  expect(search(t, 18)).toBe(true)
  expect(search(t, 20)).toBe(true)
  expect(search(t, 3)).toBe(false)
  expect(search(t, 5)).toBe(false)
})

test('remove a leaf node from a tree', () => {
  const t = new Node(15, new Node(10), new Node(20, null, new Node(25)))

  remove(t, 10)
  expect(t.left).toBeNull()

  remove(t, 25)
  expect(t.right.right).toBeNull()
})

test('remove a node that has only one child', () => {
  const t = new Node(15, new Node(10), new Node(20, null, new Node(25)))

  remove(t, 20)
  expect(t.right.value).toBe(25)

  const t_ = new Node(
    15,
    new Node(10, new Node(5, new Node(3))),
    new Node(20, null, new Node(25)),
  )
  remove(t_, 5)
  expect(t_.left.left.value).toBe(3)
})

test('remove a node that has 2 children', () => {
  const t = new Node(
    4,
    new Node(2),
    new Node(
      5,
      null,
      new Node(
        11,
        new Node(9, new Node(6), new Node(10)),
        new Node(
          18,
          new Node(17, new Node(16, new Node(20))),
          new Node(24, null, new Node(16)),
        ),
      ),
    ),
  )
  remove(t, 11)
  expect(t.right.right.value).toBe(9)
  expect(t.right.right.right.value).toBe(10)
  expect(t.right.right.right.right.value).toBe(18)
})

test('find maximum of a tree', () => {
  const t = new Node(15, new Node(10), new Node(20, null, new Node(25)))
  expect(findMax(t).value).toBe(25)

  const t_ = new Node(15, new Node(10, new Node(5)))
  expect(findMax(t_).value).toBe(15)

  const t__ = new Node(
    15,
    new Node(10, new Node(5)),
    new Node(20, null, new Node(25, new Node(22))),
  )
  expect(findMax(t__).value).toBe(25)
})

test('find minimum of a tree', () => {
  const t = new Node(15, new Node(10), new Node(20, null, new Node(25)))
  expect(findMin(t).value).toBe(10)

  const t_ = new Node(15, new Node(10, new Node(5)))
  expect(findMin(t_).value).toBe(5)

  const t__ = new Node(
    15,
    new Node(10, new Node(5)),
    new Node(20, null, new Node(25, new Node(22))),
  )
  expect(findMin(t__).value).toBe(5)

  const t___ = new Node(15, null, new Node(20))
  expect(findMin(t___).value).toBe(15)
})

test('find height of a node', () => {
  //       15
  //     /    \
  //    10    20
  //   /        \
  //  5          25
  //            /
  //           22
  const t = new Node(
    15,
    new Node(10, new Node(5)),
    new Node(20, null, new Node(25, new Node(22))),
  )

  expect(height(t.left.left)).toBe(0)
  expect(height(t.left)).toBe(1)
  expect(height(t)).toBe(3)
})

test('rotate tree to the right', () => {
  const t = new Node(10, new Node(5, new Node(1), new Node(7)), new Node(15))

  const t_ = rotateRight(t)
  expect(t_.value).toBe(5)
  expect(t_.left.value).toBe(1)
  expect(t_.right.value).toBe(10)
  expect(t_.right.left.value).toBe(7)
  expect(t_.right.right.value).toBe(15)
})

test('rotate tree to the left', () => {
  const t = new Node(10, new Node(7), new Node(15, new Node(11), new Node(16)))

  const t_ = rotateLeft(t)
  expect(t_.value).toBe(15)
  expect(t_.right.value).toBe(16)
  expect(t_.left.value).toBe(10)
  expect(t_.left.right.value).toBe(11)
  expect(t_.left.left.value).toBe(7)
})
