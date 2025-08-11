import { Component } from '@angular/core';
import { CommonModule, AsyncPipe, CurrencyPipe } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CartService, CartItem } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, AsyncPipe, CurrencyPipe],
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products$: Observable<Product[]>;
  cartItems: () => CartItem[];
  cartCount: () => number;
  cartTotal: () => number;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products$ = this.productService.getProducts();
    this.cartItems = this.cartService.items;
    this.cartCount = () => this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
    this.cartTotal = () => this.cartService.total();
  }

  addToCart(product: Product) {
    this.cartService.add(product);
  }

  removeOneFromCart(productId: number) {
    this.cartService.removeOne(productId);
  }

  removeAllFromCart(productId: number) {
    this.cartService.removeAll(productId);
  }

  clearCart() {
    this.cartService.clear();
  }

  buy() {
    alert('¡Compra realizada con éxito!');
    this.cartService.clear();
  }
}
