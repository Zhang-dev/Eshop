import { items } from "./data/items.js";
export default class ShoppingCart {
  constructor() {
    this.items = typeof arr === "undefined" ? [] : arr;
  }

  isEmpty() {
    return this.items.length === 0;
  }
  has(id) {
    let isIn = false;
    this.items.forEach(itemInCart => {
      if (itemInCart.id === id) {
        isIn = true;
      }
    });
    return isIn;
  }

  getItem(id) {
    let thisItem = null;
    this.items.forEach(itemInCart => {
      if (itemInCart.id === id) {
        thisItem = itemInCart;
      }
    });
    return thisItem;
  }

  clear() {
    this.items = [];
  }

  changeQty(id, newQty) {
    this.items.forEach(item => {
      if (item.id === id) {
        item.qty = newQty;
      }
    });
  }

  remove(id) {
    this.items.forEach((item, index) => {
      if (item.id === id) {
        this.items.splice(index, 1);
      }
    });
  }

  add(id) {
    if (this.has(id)) {
      this.getItem(id).qty++;
    } else {
      items[id - 1].qty = 1;
      this.items.push(items[id - 1]);
    }
  }
}
