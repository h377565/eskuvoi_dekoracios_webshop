import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../shared/firestore.service';
import { AuthService } from '../../auth/auth.service';
import { Rendeles } from '../../shared/models/rendeles.model';
import { Observable } from 'rxjs';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-rendeleseim',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './rendeleseim.component.html',
  styleUrls: ['./rendeleseim.component.scss']
})
export class RendeleseimComponent implements OnInit {
  rendelesek$!: Observable<Rendeles[]>;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user?.email) {
      this.rendelesek$ = this.firestoreService.getFelhasznaloRendelesek(user.email);
    }
  }
}
