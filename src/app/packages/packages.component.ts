import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DecorPackage } from '../shared/models/decor-package';
import { PackageCardComponent } from './package-card/package-card.component';
import { MaterialModule } from '../shared/material.module';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CartService } from '../shared/cart.service';
import {Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MaterialModule, PackageCardComponent, ShortenPipe, CommonModule,HttpClientModule],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  packages: DecorPackage[] = [];
  @Input() package!: DecorPackage;
  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  

  ngOnInit(): void {
    const saved = localStorage.getItem('packages');
    if (saved) {
      this.packages = JSON.parse(saved);
    }else {
            this.packages = [
        {
          id: 1,
          name: 'Romantikus Rózsadoboz',
          description: 'Egy csomag teli rózsákkal, elegáns rózsaszín árnyalatokban.',
          price: 4000,
          image: '/images/rozsadoboz.jpg'
        },
        {
          id: 2,
          name: 'Szatén szalag',
          description: 'Sima felületű, csillogó szatén szalag klasszikus dekorációs célokra. ',
          price: 1800,
          image: '/images/szaten.jpg'
        },
        {
          id: 3,
          name: 'Organza szalag',
          description: 'Prémium minőségű organza szalag, mely elegáns csillogásával emeli ki a legkülönlegesebb pillanatokat. Romantikus kiegészítő bármilyen dekorációhoz.',
          price: 1200,
          image: '/images/organza.jpg'
        },
        {
          id: 5,
          name: 'Fotófal',
          description: 'Letisztult fotófal díszekkel együtt',
          price: 10000,
          image: '/images/fotofal.png'
        },
        {
          id: 6,
          name: 'Tortadísz',
          description: 'Tortába szúrható dísz felirattal',
          price: 5000,
          image: '/images/tortadisz.png'
        },
        
      ];
  
      
      localStorage.setItem('packages', JSON.stringify(this.packages));
    }
  }
  
  

  onPackageSelected(id: number) {
    console.log('Kiválasztott csomag ID:', id);
  }
  handleSelection(selectedPackage: DecorPackage) {
    console.log('Kiválasztott csomag:', selectedPackage);
  }
  addToCart() {
    this.cartService.addToCart(this.package);
  }
  
  
}
