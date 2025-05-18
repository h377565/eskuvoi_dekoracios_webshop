import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData, query, orderBy, where, limit} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Rendeles } from './models/rendeles.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  addRendeles(rendeles: Rendeles): Promise<any> {
    const coll = collection(this.firestore, 'rendelesek');
    return addDoc(coll, rendeles);
  }

  getRendelesek(): Observable<Rendeles[]> {
    const coll = collection(this.firestore, 'rendelesek');
    return collectionData(coll, { idField: 'id' }) as Observable<Rendeles[]>;
  }

  updateRendeles(id: string, data: Partial<Rendeles>): Promise<void> {
    const docRef = doc(this.firestore, 'rendelesek', id);
    return updateDoc(docRef, data);
  }

  deleteRendeles(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'rendelesek', id);
    return deleteDoc(docRef);
  }
  
  getLatestOrders(dbLimit: number): Observable<Rendeles[]> {
  const coll = collection(this.firestore, 'rendelesek');
  const q = query(coll, limit(dbLimit));
  return collectionData(q, { idField: 'id' }) as Observable<Rendeles[]>;
}
getFelhasznaloRendelesek(email: string): Observable<Rendeles[]> {
  const collRef = collection(this.firestore, 'rendelesek');
  const q = query(collRef, orderBy('datum', 'desc'), where('email', '==', email));
  return collectionData(q, { idField: 'id' }) as Observable<Rendeles[]>;
}


}
