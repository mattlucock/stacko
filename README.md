# stacko

[![npm version](https://img.shields.io/npm/v/stacko?style=flat-square)](https://www.npmjs.com/package/stacko)
[![npm minified bundle size](https://img.shields.io/bundlephobia/min/stacko?style=flat-square)](https://bundlephobia.com/package/stacko)
[![Build status](https://img.shields.io/github/actions/workflow/status/mattlucock/stacko/build.yml?style=flat-square)](https://github.com/mattlucock/stacko/actions/workflows/build.yml)
[![License](https://img.shields.io/github/license/mattlucock/stacko?style=flat-square)](https://github.com/mattlucock/stacko/blob/main/LICENSE.md)

A fast, tiny, type-safe stack data structure.

```ts
import { Stack } from 'stacko'

const stack = new Stack<string>()
// The constructor supports passing an optional array of initial values.
// If you pass an array, you could omit the type parameter, as it would be
// inferred.

stack.push('apple')
stack.push('banana')
stack.push('pear')

stack.size // 3
stack.peek() // 'pear'

stack.pop() // 'pear'
stack.size // 2
stack.toArray() // ['apple', 'banana']

// Iteratively pop items off the stack
for (const item of stack.popper()) {
  console.log(item)
}
// 'banana'
// 'apple'

stack.size // 0

stack.push('clear this')
stack.clear()
```

## Features

- `stacko` is implemented as an array, making it **up to 4–5x faster** than a number of other JS stacks that are implemented as a linked list.
- `stacko` is tiny. [Read the source code](https://github.com/mattlucock/stacko/blob/main/src/stack.ts); it won't take long.
- `stacko` supports an elegant iterator for iteratively popping the stack.

## Iteration

What does it mean to iterate a stack? It isn't immediately obvious what it should mean, since a stack is not an array or a list. With a stack, only the top item should be visible at any time.

`stacko` supports an iterator that iteratively pops the stack, returned by the `popper()` method. You can use it directly with a `for...of` loop. Iterative popping is something you probably want to do anyway, and this is an elegant solution to iterating a stack.

Note:
- Unlike most iterators, this iterator has side effects (it pops the stack).
- The item is popped prior to the body of the loop, meaning that inside the loop, the item is no longer on the stack. You could then peek the stack to look ahead to the next item, and you can `break` the loop at any time.
- The iterator does not create a copy of the stack; it is 'live'. This means you can mutate the stack while iterating it, and the behaviour will remain consistent.

Since the stack can't be iterated like an array (for the reason stated above), it is incompatible with `Array.from()`. To convert a stack to an array, call the `toArray()` method.

## API

`Stack<T>` has the following public API:

- `size: number`
- `peek(): T | undefined`
- `push(item: T)`
- `pop(): T | undefined`
- `toArray(): T[]`
- `copy(): Stack<T>`
- `clear()`
- `popper(): IterableIterator<T>`
