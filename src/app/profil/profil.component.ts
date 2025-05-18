import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { AuthService } from '../auth/auth.service';
import { Firestore, doc, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Auth, updatePassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

interface FelhasznaloAdat {
  email: string;
  nev: string;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  profilForm!: FormGroup;
  userId!: string;

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.currentUser?.reload().then(() => {
      const user = this.auth.currentUser;
      if (user) {
        this.userId = user.uid;
        const docRef = doc(this.firestore, 'felhasznalok', this.userId);
        getDoc(docRef).then(snapshot => {
          const data = snapshot.data() as FelhasznaloAdat;

          this.profilForm = new FormGroup({
            email: new FormControl(data.email, [Validators.required, Validators.email]),
            nev: new FormControl(data.nev, Validators.required),
            jelszo: new FormControl('', Validators.minLength(6))
          });
        });
      }
    });
  }

  mentes() {
    if (this.profilForm.valid) {
      const docRef = doc(this.firestore, 'felhasznalok', this.userId);
      const email = this.profilForm.value.email;
      const nev = this.profilForm.value.nev;

      updateDoc(docRef, { email, nev })
        .then(() => {
          alert('Profil sikeresen frissítve!');
        })
        .catch(err => {
          alert('Hiba történt: ' + err.message);
        });

      // 🔒 Jelszó módosítás, ha meg van adva
      const newPassword = this.profilForm.value.jelszo?.trim();
      if (newPassword) {
        const user = this.auth.currentUser;
        if (user) {
          updatePassword(user, newPassword)
            .then(() => {
              alert('Jelszó sikeresen frissítve!');
            })
            .catch(err => {
              if (err.code === 'auth/requires-recent-login') {
                alert('A jelszó módosításához újra be kell jelentkezned.');
              } else {
                alert('Jelszó módosítása sikertelen: ' + err.message);
              }
            });
        }
      }
    }
  }

  profilTorles() {
    if (confirm('Biztosan törlöd a profilodat?')) {
      const docRef = doc(this.firestore, 'felhasznalok', this.userId);
      deleteDoc(docRef).then(() => {
        this.auth.currentUser?.delete().then(() => {
          alert('Fiók törölve.');
          this.router.navigate(['/']);
        }).catch(err => {
          alert('Hiba a fiók törlésénél: ' + err.message);
        });
      });
    }
  }
}
