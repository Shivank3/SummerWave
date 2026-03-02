import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['customer@example.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required, Validators.minLength(6)]],
  });

  isSubmitting = false;

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;

    // Simulate JWT network request
    setTimeout(() => {
      const email = this.loginForm.value.email;

      // Simple mock logic for roles
      if (email === 'admin@example.com') {
        this.authService.login('ADMIN');
        this.router.navigate(['/admin']);
      } else {
        this.authService.login('CUSTOMER');
        this.router.navigate(['/dashboard']);
      }
      this.isSubmitting = false;
    }, 1000);
  }
}
