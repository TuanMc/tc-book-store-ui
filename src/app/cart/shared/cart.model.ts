export class Cart<T> {
  items: CartItem<T>[];

  constructor() {
    this.items = [];
  }

  /**
   * Add new item to cart
   *
   * @param newItem
   */
  addItem(newItem: CartItem<T>): void {
    const existedItem = this.items.find(item => item.itemId === newItem.itemId);

    // Check if item is already existed, +1 to `quantityInCart`, else add new record to `cart`
    if (existedItem)
      existedItem.quantityInCart++;
    else
      this.items.push(newItem);
  }

  /**
   * Reset all items in cart
   */
  reset(): void {
    this.items = [];
  }

  /**
   * Caculate total number of items in cart
   * @returns number
   */
  getTotalItems(): number {
    return this.items.reduce((pre, curr) => {
      return pre + curr.quantityInCart
    }, 0);
  }

  /**
   * Caculate total price in cart
   * @returns number
   */
  getTotalPrice(): number {
    return this.items.reduce((pre, curr) => {
      return pre + (curr.pricePerItem * curr.quantityInCart)
    }, 0);
  }
}

export class CartItem<T> {
  item: T;
  itemId: string;
  quantityInCart: number;
  pricePerItem: number;

  constructor(itemId: string, item: T, quantity: number, pricePerItem: number) {
    this.itemId = itemId || "";
    this.item = JSON.parse(JSON.stringify(item));
    this.quantityInCart = quantity || 0;
    this.pricePerItem = pricePerItem || 0;
  }
}
