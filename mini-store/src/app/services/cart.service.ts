import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product.service';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);

  total = computed(() =>
    this._items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  get items() {
    return this._items.asReadonly();
  }

  add(product: Product) {
    this._items.update(items => {
      const found = items.find(item => item.id === product.id);
      if (found) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  }

  removeOne(productId: number) {
    this._items.update(items => {
      return items
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
    });
  }

  removeAll(productId: number) {
    this._items.update(items => items.filter(item => item.id !== productId));
  }

  clear() {
    this._items.set([]);
  }
}
