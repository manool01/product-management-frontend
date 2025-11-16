import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category';
import { ToastService } from '../../services/toast';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html'
})
export class CategoriesComponent {

  categories: any[] = [];
  showModal = false;
  editing = false;
  editId: number | null = null;
  name = "";

  // Pagination
  page = 1;
  limit = 10;
  total = 0;
  totalPages = 1;
  constructor(private categoryService: CategoryService, private toast: ToastService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  openAdd() {
    this.name = "";
    this.editing = false;
    this.showModal = true;
  }

  openEdit(c: any) {
    this.name = c.name;
    this.editing = true;
    this.editId = c.id;
    this.showModal = true;
  }

  save() {
    if (!this.name.trim()) {
      this.toast.warning("Name is required");
      return;
    }

    if (this.editing) {
      this.categoryService.update(this.editId!, { name: this.name }).subscribe(() => {
        this.toast.success("Category updated successfully");
        this.closeModal();
        this.loadCategories();
      });
    } else {
      this.categoryService.add({ name: this.name }).subscribe(() => {
        this.toast.success("Category added successfully");
        this.closeModal();
        this.loadCategories();
      });
    }
  }

  remove(c: any) {
    if (!confirm("Delete this category?")) return;
    this.categoryService.delete(c.id).subscribe(() => {
      this.toast.error("Category deleted");
      this.loadCategories();
    });
  }

  closeModal() {
    this.showModal = false;
  }

  loadCategories() {
    this.categoryService.getCategories(this.page, this.limit).subscribe((res: any) => {
      this.categories = res?.categories;
      this.total = res.total;
      this.totalPages = Math.ceil(this.total / this.limit);
    });
  }

  // Pagination controls
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadCategories();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadCategories();
    }
  }

}
