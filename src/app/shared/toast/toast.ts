import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastType, ToastService } from '../../services/toast';

const ICONS: Record<ToastType, string> = {
  success: "M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z",
  error: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707z",
  warning: "M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.857 12.182C19.365 16.78 18.52 18 17.114 18H2.886c-1.406 0-2.25-1.22-1.486-2.719L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-6a1 1 0 00-.993.883L9 8v3a1 1 0 001.993.117L11 11V8a1 1 0 00-1-1z",
  info: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-9-1h2v6h-2v-6zm0-4h2v2h-2V5z"
};

const BG: Record<ToastType, string> = {
  success: 'bg-green-100',
  error: 'bg-red-100',
  warning: 'bg-yellow-100',
  info: 'bg-blue-100'
};

const TEXT: Record<ToastType, string> = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600'
};

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="toast"
     class="fixed top-4 right-4 w-full max-w-xs flex items-center p-4 rounded-lg shadow border z-50 animate-toast bg-white">
    
    <div [ngClass]="BG[toast.type]" class="inline-flex justify-center items-center w-8 h-8 rounded-lg mr-3">
      <svg class="w-5 h-5" [ngClass]="TEXT[toast.type]" fill="currentColor" viewBox="0 0 20 20">
        <path [attr.d]="ICONS[toast.type]" />
      </svg>
    </div>

    <div class="text-sm font-normal text-gray-800">{{ toast.message }}</div>

    <button class="ml-auto text-gray-400 hover:text-gray-900"
            (click)="close()">
      ✖
    </button>
  </div>
  `,
  styles: [`
    .animate-toast {
      animation: fadeInOut 3s ease-in-out forwards;
    }
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(10px); }
      10% { opacity: 1; transform: translateY(0); }
      90% { opacity: 1; }
      100% { opacity: 0; transform: translateY(10px); }
    }
  `]
})
export class ToastComponent {
  toast: { message: string; type: ToastType } | null = null;

  ICONS = ICONS;
  BG = BG;
  TEXT = TEXT;

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe((value) => {
      this.toast = value;
    });
  }

  close() {
    this.toast = null;
  }
}
