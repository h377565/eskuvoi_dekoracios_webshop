import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PackagesComponent } from './packages/packages.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import {CartComponent} from './cart/cart.component'
import { AuthGuard } from './auth/auth.guard';
import { RendelesListaComponent } from './orders/rendeles-lista/rendeles-lista.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent },
  {
  path: 'login',
  loadComponent: () =>
    import('./auth/login/login.component').then(m => m.LoginComponent)
},
{
  path: 'register',
  loadComponent: () =>
    import('./auth/register/register.component').then(m => m.RegisterComponent)
},
  { path: 'cart', component: CartComponent },

  {
  path: 'checkout',
  loadComponent: () => import('./orders/checkout/checkout.component').then(m => m.CheckoutComponent),
  canActivate: [AuthGuard]
},
{ path: 'rendelesek', component: RendelesListaComponent, canActivate: [AuthGuard] },

{
  path: 'rendeleseim',
  loadComponent: () => import('./orders/rendeleseim/rendeleseim.component')
    .then(m => m.RendeleseimComponent),
  canActivate: [AuthGuard]
}, 
{
  path: 'profil',
  loadComponent: () => import('./profil/profil.component').then(m => m.ProfilComponent),
  canActivate: [AuthGuard]
}



  
];