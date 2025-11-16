import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl:'./login.component.css'
})
export class LoginComponent {
  email = "";
  password = "";
  year = new Date().getFullYear();

  constructor(private auth: AuthService, private router: Router, private toast: ToastService
  ) { }

  submit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.toast.success(res?.message);
        this.auth.setToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toast.error("Invalid email or password "); 
      }
    });
  }
}
