import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field'; // opcionális

import { DecorPackage } from '../shared/models/decor-package';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class AdminComponent implements OnInit {
  packageForm: FormGroup;
  packages: DecorPackage[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']);
      return;
    }

    const saved = localStorage.getItem('packages');
    if (saved) {
      this.packages = JSON.parse(saved);
    }
  }

  addPackage() {
    if (this.packageForm.valid) {
      const newPackage = this.packageForm.value as DecorPackage;
      this.packages.push(newPackage);
      localStorage.setItem('packages', JSON.stringify(this.packages));
      this.packageForm.reset();
    }
  }

  deletePackage(index: number) {
    this.packages.splice(index, 1);
    localStorage.setItem('packages', JSON.stringify(this.packages));
  }
  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
  resetPackages() {
  localStorage.removeItem('packages');
  window.location.reload();
}
  
}
