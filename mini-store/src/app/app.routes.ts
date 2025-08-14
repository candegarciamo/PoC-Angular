import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
];
