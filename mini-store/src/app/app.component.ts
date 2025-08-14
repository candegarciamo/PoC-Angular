import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="header-tienda">
    <h1>Mini Tienda Angular</h1>
  </header>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
