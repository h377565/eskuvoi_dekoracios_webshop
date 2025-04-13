import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  images = [
    '/organza.jpg',
    '/rozsadoboz.jpg',
    '/szaten.jpg'
  ];
}
