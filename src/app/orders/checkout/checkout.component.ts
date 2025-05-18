import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CartService } from '../../shared/cart.service';
import { Rendeles } from '../../shared/models/rendeles.model';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      nev: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cim: ['', Validators.required],
      megjegyzes: ['']
    });
  }

  async submitOrder() {
    if (this.checkoutForm.valid) {
      const rendeles: Rendeles = {
        ...this.checkoutForm.value,
        termekek: this.cartService.getItems().map(i => i.name)
      };

      const ref = collection(this.firestore, 'rendelesek');
      await addDoc(ref, rendeles);

      this.cartService.clearCart();
      alert('Sikeres rendelés!');
      this.router.navigateByUrl('/');
    }
  }
}
