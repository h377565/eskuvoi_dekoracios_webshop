import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
   private firestore = inject(Firestore);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable(); 

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

   register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(cred => {
      console.log('Felhasználó regisztrálva: ', cred.user.uid);
      const userRef = doc(this.firestore, 'felhasznalok', cred.user.uid);
      return setDoc(userRef, {
        email: cred.user.email,
        nev: ''
      });
    });
    
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }
}
