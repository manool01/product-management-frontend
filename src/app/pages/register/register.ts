import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router, private toast: ToastService) { }

  submit() {
    this.auth.register({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.toast.success("Account created successfully ✅");
        this.router.navigate(['/login']);
      },
      error: (err) => this.toast.error(err?.error?.error || "Something went wrong")
    });
  }
}
