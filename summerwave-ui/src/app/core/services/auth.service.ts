import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Mock authentication state using Angular Signals
  isAuthenticated = signal(false);
  userRole = signal<'GUEST' | 'CUSTOMER' | 'ADMIN'>('GUEST');

  constructor() { }

  login(role: 'CUSTOMER' | 'ADMIN') {
    this.isAuthenticated.set(true);
    this.userRole.set(role);
  }

  logout() {
    this.isAuthenticated.set(false);
    this.userRole.set('GUEST');
  }
}
