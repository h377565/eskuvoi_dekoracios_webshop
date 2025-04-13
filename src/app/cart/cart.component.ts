import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { DecorPackage } from '../shared/models/decor-package';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, CurrencyPipe]
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
    this.cartItems.splice(index, 1);
  }
}
