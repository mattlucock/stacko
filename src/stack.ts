/**
 * Stack data structure
 */
export class Stack<T> {
	#items: Array<T>

	/**
	 * @param initialItems If provided, the elements of the array will be set as the initial items of
	 * the stack. The array will be considered as being in stack order i.e. the last element of the
	 * array will be the top item of the stack. The array itself will not be mutated.
	 */
	constructor(initialItems?: Array<T>) {
		this.#items = initialItems?.slice() ?? []
	}

	/**
	 * The number of items on the stack.
	 */
	get size(): number {
		return this.#items.length
	}

	/**
	 * Whether the stack is empty. Equivalent to `size === 0`.
	 */
	get empty(): boolean {
		return this.size === 0
	}

	/**
	 * Returns the top item from the stack without popping it.
	 * @returns The top item from the stack, or `undefined` if the stack is empty.
	 */
	peek(): T | undefined {
		return this.#items.at(-1)
	}

	/**
	 * Pushes a new item onto the stack.
	 */
	push(item: T): void {
		this.#items.push(item)
	}

	/**
	 * Pops the top item from the stack and return it.
	 * @returns The top item from the stack, or `undefined` if the stack is empty.
	 */
	pop(): T | undefined {
		return this.#items.pop()
	}

	/**
	 * Returns a shallow copy of the stack's underlying array.
	 * You could push to and pop this array in the same manner as the stack.
	 */
	toArray(): Array<T> {
		return this.#items.slice()
	}

	/**
	 * Returns a shallow copy of the stack.
	 */
	copy(): Stack<T> {
		return new Stack(this.#items)
	}

	/**
	 * Removes all items from the stack.
	 */
	clear(): void {
		this.#items = []
	}

	/**
	 * Returns an iterator that iteratively pops the stack and returns the popped item.
	 *
	 * The iterator does not make a copy of the stack; it is 'live'.
	 *
	 * @param testFn An optional function to evaluate for each item. The item will only be popped if
	 * the function returns truthy. If the function returns falsy, the item won't be popped and the
	 * iterator will complete.
	 */
	*popper(testFn?: (item: T) => boolean): IterableIterator<T> {
		let item: T | undefined

		while ((item = this.peek()) !== undefined) {
			// Note that a non-TS user may not return a boolean from the predicate.
			if (testFn !== undefined && !testFn(item)) {
				break
			}

			this.pop()
			yield item
		}
	}

	toJSON(): unknown {
		// Return copy so as to not leak the private field.
		return this.#items.slice()
	}
}
