import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../shared/firestore.service';
import { MaterialModule } from '../../shared/material.module';
import { Rendeles } from '../../shared/models/rendeles.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rendeles-lista',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './rendeles-lista.component.html',
  styleUrls: ['./rendeles-lista.component.scss']
})
export class RendelesListaComponent implements OnInit {
  rendelesek$!: Observable<Rendeles[]>;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
  this.rendelesek$ = this.firestoreService.getLatestOrders(10);
}
}
