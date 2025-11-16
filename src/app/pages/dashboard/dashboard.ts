import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { ToastService } from '../../services/toast';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {

  summary: any = null;
  recentProducts: any[] = [];

  constructor(private productApi: ProductService, private toast: ToastService) {
    this.loadLatest();
  }

  loadLatest() {
    this.productApi.list().subscribe((res: any) => {
      this.recentProducts = res.products.slice(0, 5);
    });
  }

  logout() {
    localStorage.removeItem("token");
    location.reload();
  }

  toggleSidebar() {
  }
}
