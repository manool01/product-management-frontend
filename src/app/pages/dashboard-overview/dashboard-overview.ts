import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { ToastService } from '../../services/toast';


@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.html'
})
export class DashboardOverviewComponent {

  summary: any = null;
  products: any[] = [];
  totalPrice = 0;
  avgPrice = 0;
  highestProduct: any = null;
  lowestProduct: any = null;

  constructor(private api: ProductService, private toast: ToastService) {
    this.load();
  }

  load() {
    this.api.getDashboardSummary().subscribe((res: any) => {
      this.summary = res;
      this.avgPrice = res.avgPrice;
      this.highestProduct = res.highestProduct;
      this.lowestProduct = res.lowestProduct;
      this.totalPrice = res.totalInventoryValue;
    });
  }
}
