/**
 * Stack data structure
 */
export class Stack<T> {
  // I typically would not name private members with an underscore, but since this class is
  // intended for consumption by non-TS consumers and the cost of using the underscore in this case
  // is minimal, I think it is sensible.
  private _items: T[]

  /**
   * @param initialItems If provided, the elements of the array will be set as the initial items of
   * the stack. The array will be considered as being in stack order i.e. the last element of the
   * array will be the top item of the stack. The array itself will not be mutated.
   */
  public constructor (initialItems?: readonly T[]) {
    this._items = (initialItems !== undefined ? initialItems.slice() : [])
  }

  /**
   * The number of items on the stack.
   */
  public get size (): number {
    return this._items.length
  }

  /**
   * Whether the stack is empty. Equivalent to `size === 0`.
   */
  public get empty (): boolean {
    return this.size === 0
  }

  /**
   * Returns the top item from the stack without popping it.
   * @returns The top item from the stack, or `undefined` if the stack is empty.
   */
  public peek (): T | undefined {
    return this._items[this.size - 1]
  }

  /**
   * Pushes a new item onto the stack.
   */
  public push (item: T): void {
    this._items.push(item)
  }

  /**
   * Pops the top item from the stack and return it.
   * @returns The top item from the stack, or `undefined` if the stack is empty.
   */
  public pop (): T | undefined {
    return this._items.pop()
  }

  /**
   * Returns a shallow copy of the stack's underlying array.
   * You could push to and pop this array in the same manner as the stack.
   */
  public toArray (): T[] {
    return this._items.slice()
  }

  /**
   * Returns a shallow copy of the stack.
   */
  public copy (): Stack<T> {
    return new Stack(this._items)
  }

  /**
   * Removes all items from the stack.
   */
  public clear (): void {
    this._items = []
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
  public * popper (testFn?: (item: T) => boolean): IterableIterator<T> {
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

  public toJSON (): unknown {
    return this._items
  }
}
