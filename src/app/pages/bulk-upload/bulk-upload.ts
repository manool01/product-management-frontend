import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { ToastService } from '../../services/toast';

type BulkUploadResult = {
  inserted: number;
  skipped: number;
  skippedExamples: { row: any; reason: string }[];
};

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bulk-upload.html'
})
export class BulkUploadComponent {

  file: File | null = null;
  loading = false;
  result: BulkUploadResult | null = null;

  constructor(private api: ProductService, private toast: ToastService) { }

  onFileSelect(event: any) {
    this.file = event.target.files[0];
    this.result = null;
  }

  upload() {
    if (!this.file) {
      this.toast.warning("Please select a file");
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append("file", this.file);

    this.api.bulkUpload(formData).subscribe({
      next: (res: any) => {
        this.result = res;
        this.toast.success("Bulk upload completed ✅");
        this.loading = false;
      },
      error: () => {
        this.toast.error("Upload failed ❌");
        this.loading = false;
      }
    });
  }
}
