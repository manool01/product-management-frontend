import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category';
import { ProductService } from '../../services/product';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html'
})
export class ProductsComponent {

  products: any[] = [];
  categories: any[] = [];
  imageFile: File | null = null;
  previewUrl: string | null = null;
  showModal = false;
  editing = false;

  editId: number | null = null;

  name = "";
  price: any = "";
  categoryId: any = "";

  // Pagination
  page = 1;
  limit = 12;
  total = 0;
  totalPages = 1;


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts(this.page, this.limit).subscribe((res: any) => {
      this.products = res.products;
      this.total = res.total;
      this.totalPages = Math.ceil(this.total / this.limit);
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  // Pagination controls
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }

  closeModal() {
    this.showModal = false;
  }

  remove(product: any) {
    if (!confirm("Are you sure?")) return;
    this.productService.delete(product.id).subscribe(() => {
      this.loadProducts();
    });
  }


  onImageSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.imageFile = input.files[0];

      // preview
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(this.imageFile);
    }
  }

  openAdd() {
    this.editing = false;
    this.showModal = true;
    this.editId = null;
    this.name = '';
    this.price = null;
    this.categoryId = null;
    this.imageFile = null;
    this.previewUrl = null;
  }

  openEdit(product: any) {
    this.editing = true;
    this.showModal = true;
    this.editId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.categoryId = product.CategoryId;
    this.imageFile = null;
    this.previewUrl = product.image || null; // show current
  }

  save() {
    const fd = new FormData();
    fd.append('name', this.name);
    fd.append('price', String(this.price));
    fd.append('categoryId', String(this.categoryId));
    if (this.imageFile) fd.append('image', this.imageFile);

    if (this.editing) {
      this.productService.update(this.editId!, fd).subscribe(() => {
        this.toast.success('Product updated successfully');
        this.closeModal();
        this.loadProducts();
      });
    } else {
      this.productService.add(fd).subscribe(() => {
        this.toast.success('Product added successfully');
        this.closeModal();
        this.loadProducts();
      });
    }
  }

}
