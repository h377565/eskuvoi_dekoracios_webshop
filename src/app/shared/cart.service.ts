import { Injectable } from '@angular/core';
import { DecorPackage } from './models/decor-package';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: DecorPackage[] = [];

  getItems(): DecorPackage[] {
    return this.cartItems;
  }

  addToCart(item: DecorPackage) {
    this.cartItems.push(item);
  }

  getCart(): DecorPackage[] {
    const stored = localStorage.getItem('cart');
    return this.cartItems;
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
  }
  
}
