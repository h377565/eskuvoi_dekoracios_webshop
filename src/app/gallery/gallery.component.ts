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
    'images/organza.jpg',
    'images/rozsadoboz.jpg',
    'images/szaten.jpg'
  ];
}
