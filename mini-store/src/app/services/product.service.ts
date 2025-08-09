// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>('/products.json');
  }

  getById(id: number) {
    return this.getProducts().pipe(
      map((list) => list.find((p) => p.id === id))
    );
  }
}
