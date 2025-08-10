// src/app/products/product-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../services/product.service'; // Adjust path as needed
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  selector: 'app-product-list',
  template: `
    <h2>Productos</h2>
    <div class="product-grid">
      <div *ngFor="let product of products$ | async" class="product-card">
        <img [src]="product.image" alt="{{ product.name }}" width="100" />
        <h3>{{ product.name }}</h3>
        <p>Precio: {{ product.price | currency }}</p>
        <button (click)="addToCart(product)">Agregar al carrito</button>
      </div>
    </div>
    <hr />

    <div class="cart-fixed">
      <h2>Carrito ({{ cartCount() }})</h2>
      <div *ngFor="let item of cartItems()" class="cart-item"> 
        {{ item.name }} - {{ item.price | currency }}
        <button (click)="removeFromCart(item.id)">Eliminar</button>
      </div>
      <button *ngIf="cartCount() > 0" (click)="clearCart()">Vaciar carrito</button>
    </div>
      `,
})
export class ProductListComponent {
  products$: Observable<Product[]>;
  cartItems: () => Product[];
  cartCount: () => number;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products$ = this.productService.getProducts();
    this.cartItems = this.cartService.items;
    this.cartCount = () => this.cartItems().length;
  }

  addToCart(product: Product) {
    this.cartService.add(product);
  }

  removeFromCart(productId: number) {
    this.cartService.remove(productId);
  }

  clearCart() {
    this.cartService.clear();
  }
}

