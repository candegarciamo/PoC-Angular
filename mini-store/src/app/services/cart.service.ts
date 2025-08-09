import { Injectable, signal } from '@angular/core';
import { Product } from './product.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<Product[]>([]);

  get items() {
    return this._items.asReadonly();
  }

  add(product: Product) {
    this._items.update(items => {
      const found = items.find(item => item.id === product.id);
      if (found) return items; // No duplicar productos
      return [...items, product];
    });
  }

  remove(productId: number) {
    this._items.update(items => items.filter(item => item.id !== productId));
  }

  clear() {
    this._items.set([]);
  }
}
