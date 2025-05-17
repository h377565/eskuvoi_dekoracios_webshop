
import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { DecorPackage } from '../shared/models/decor-package';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MaterialModule } from '../shared/material.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MaterialModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: DecorPackage[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  remove(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getItems(); // frissítés
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
