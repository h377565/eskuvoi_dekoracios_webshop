import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { DecorPackage } from '../shared/models/decor-package';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FirestoreService } from '../shared/firestore.service';
import { AuthService } from '../auth/auth.service';
import { Rendeles } from '../shared/models/rendeles.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MaterialModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: DecorPackage[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

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

  rendelesLead() {


    const user = this.authService.getCurrentUser();
    if (!user) {
      alert('Be kell jelentkezned a rendeléshez.');
      return;
    }

    const rendeles: Rendeles = {
      email: user.email ?? '',
      termekek: this.cartItems.map(item => ({
        name: item.name,
        price: item.price,
        description: item.description
      })),
      osszeg: this.getTotal(),
      datum:  new Date().toISOString() 
    };
    console.log('MENTENDŐ OBJEKTUM:', JSON.stringify(rendeles, null, 2));


    this.firestoreService.addRendeles(rendeles).then(() => {
      alert('Rendelés sikeresen leadva!');
      this.clearCart();
    }).catch(error => {
      console.error('Hiba a rendelés során:', error);
      alert('Nem sikerült a rendelést leadni.');
    });
  }
}
