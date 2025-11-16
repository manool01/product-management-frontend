import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSource = new BehaviorSubject<{ message: string, type: ToastType } | null>(null);
  toast$ = this.toastSource.asObservable();
  private showToast(message: string, type: ToastType, timeout: number = 3000) {
    this.toastSource.next({ message, type });
    setTimeout(() => this.toastSource.next(null), timeout);
  }

  success(msg: string, timeout?: number) { this.showToast(msg, 'success', timeout); }
  error(msg: string, timeout?: number) { this.showToast(msg, 'error', timeout); }
  warning(msg: string, timeout?: number) { this.showToast(msg, 'warning', timeout); }
  info(msg: string, timeout?: number) { this.showToast(msg, 'info', timeout); }
}
