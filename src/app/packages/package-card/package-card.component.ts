import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { DecorPackage } from '../../shared/models/decor-package';
import { ShortenPipe } from '../../shared/pipes/shorten.pipe';
import { CartService } from '../../shared/cart.service';
import { UppercaseFirstPipe } from '../../shared/pipes/uppercase-first.pipe';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule, MaterialModule, ShortenPipe, UppercaseFirstPipe],
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss']
})
export class PackageCardComponent {
  @Input() package!: DecorPackage;
  @Output() selected = new EventEmitter<number>();

  constructor(private cartService: CartService) {}

  select() {
    this.selected.emit(this.package.id);
  }

  addToCart() {
    this.cartService.addToCart(this.package);
  }
  @Input() szin: string = ''; 
  @Output() torles = new EventEmitter<void>(); 

}
