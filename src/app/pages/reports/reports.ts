import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html'
})
export class ReportsComponent {

  loadingCSV = false;
  loadingExcel = false;

  constructor(private api: ProductService, private toast: ToastService) { }

  private saveFile(blob: Blob, filename: string) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  exportCSV() {
    this.loadingCSV = true;
    this.api.downloadCSV().subscribe({
      next: (res) => {
        this.saveFile(res, "products.csv");
        this.toast.success("CSV Downloaded ✅");
        this.loadingCSV = false;
      },
      error: () => {
        this.toast.error("Failed to download CSV ");
        this.loadingCSV = false;
      }
    });
  }

  exportExcel() {
    this.loadingExcel = true;
    this.api.downloadExcel().subscribe({
      next: (res) => {
        this.saveFile(res, "products.xlsx");
        this.toast.success("Excel Downloaded ✅");
        this.loadingExcel = false;
      },
      error: () => {
        this.toast.error("Failed to download Excel");
        this.loadingExcel = false;
      }
    });
  }
}
