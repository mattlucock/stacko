import { test } from 'node:test'
import * as assert from 'node:assert/strict'

import { Stack } from '../src/stack'

void test('Stack is empty by default', () => {
  const stack = new Stack<unknown>()

  assert.equal(stack.size, 0)
  assert.equal(stack.empty, true)
  assert.equal(stack.peek(), undefined)
})

void test('Basic operations', () => {
  const stack = new Stack<string>()

  stack.push('a')
  assert.equal(stack.size, 1)
  assert.equal(stack.empty, false)
  assert.equal(stack.peek(), 'a')

  stack.push('b')
  assert.equal(stack.size, 2)
  assert.equal(stack.peek(), 'b')

  assert.equal(stack.pop(), 'b')
  assert.equal(stack.pop(), 'a')
  assert.equal(stack.size, 0)
  assert.equal(stack.empty, true)
})

void test('Clearing the stack', () => {
  const stack = new Stack<string>()

  stack.push('a')
  stack.clear()

  assert.equal(stack.size, 0)
  assert.equal(stack.empty, true)
})

void test('toArray() returns the stack\'s values in insertion order', () => {
  const stack = new Stack<string>()

  assert.deepEqual(stack.toArray(), [])

  stack.push('a')
  stack.push('b')
  assert.deepEqual(stack.toArray(), ['a', 'b'])

  stack.pop()
  assert.deepEqual(stack.toArray(), ['a'])
  stack.pop()
  assert.deepEqual(stack.toArray(), [])
})

void test('toArray() returns a copy of the stack\'s array', () => {
  const stack = new Stack<string>()

  const array = stack.toArray()
  stack.push('a')

  assert.deepEqual(array, [])
})

void test('copy() returns a shallow copy of the stack', () => {
  const original = new Stack<string>()
  original.push('apple')

  const copy = original.copy()
  assert.equal(copy.size, 1)
  assert.equal(copy.peek(), 'apple')

  // Copy doesn't change when original is mutated
  original.push('banana')
  assert.equal(copy.size, 1)
  assert.equal(original.size, 2)

  // Original doesn't change when copy is mutated
  copy.push('pear')
  assert.equal(original.size, 2)
})

void test('popper() without a predicate', () => {
  const stack = new Stack<string>()
  stack.push('a')
  stack.push('b')

  const iterator = stack.popper()

  let result = iterator.next()
  assert.equal(result.value, 'b')
  assert.equal(result.done, false)

  result = iterator.next()
  assert.equal(result.value, 'a')
  assert.equal(result.done, false)

  result = iterator.next()
  assert.equal(result.value, undefined)
  assert.equal(result.done, true)
})

void test('popper() with a predicate', () => {
  const stack = new Stack<number>()
  stack.push(1)
  stack.push(2)

  const iterator = stack.popper(x => x > 1)

  let result = iterator.next()
  assert.equal(result.done, false)

  result = iterator.next()
  assert.equal(result.done, true)

  assert.equal(stack.peek(), 1)
})

void test('toJSON()', () => {
  const stack = new Stack<string>()

  assert.equal(JSON.stringify(stack), JSON.stringify([]))
  stack.push('a')
  assert.equal(JSON.stringify(stack), JSON.stringify(['a']))
})

void test('Constructor accepts initial items', () => {
  const stack = new Stack(['a', 'b'])

  assert.equal(stack.size, 2)
  assert.equal(stack.pop(), 'b')
  assert.equal(stack.pop(), 'a')
})

void test('Initial items array is not mutated', () => {
  const initialItems = ['a']
  const stack = new Stack(initialItems)

  stack.pop()
  assert.deepEqual(initialItems, ['a'])
  stack.push('')
  assert.deepEqual(initialItems, ['a'])
  stack.clear()
  assert.deepEqual(initialItems, ['a'])
})
