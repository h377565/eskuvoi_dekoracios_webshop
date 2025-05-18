import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, query, where, orderBy, limit, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Rendeles } from '../../shared/models/rendeles.model';

@Injectable({providedIn: 'root'})
export class RendelesService {
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
  getAllOrders(): Observable<Rendeles[]> {
    const ref = collection(this.firestore, 'rendelesek');
    return collectionData(ref, { idField: 'id' }) as Observable<Rendeles[]>;
  }

  getOrdersByEmail(email: string): Observable<Rendeles[]> {
    const ref = collection(this.firestore, 'rendelesek');
    const q = query(ref, where('email', '==', email));
    return collectionData(q, { idField: 'id' }) as Observable<Rendeles[]>;
  }

  getLatestOrders(limitCount: number): Observable<Rendeles[]> {
    const ref = collection(this.firestore, 'rendelesek');
    const q = query(ref, orderBy('datum', 'desc'), limit(limitCount));
    return collectionData(q, { idField: 'id' }) as Observable<Rendeles[]>;
  }

  getOrdersSortedByName(): Observable<Rendeles[]> {
    const ref = collection(this.firestore, 'rendelesek');
    const q = query(ref, orderBy('nev'));
    return collectionData(q, { idField: 'id' }) as Observable<Rendeles[]>;
  }
}


