import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  ticketTypes: TicketType[] = [
    { id: 't1', name: 'Adult Ticket', description: 'Age 12+', price: 999 },
    { id: 't2', name: 'Child Ticket', description: 'Age 3-11', price: 599 },
    { id: 't3', name: 'Family Pass', description: '2 Adults + 2 Kids', price: 2999 },
  ];

  isWeekend = false;
  weekendMultiplier = 1.2;

  cart: { ticket: TicketType, quantity: number }[] = [];
  couponCode = '';
  discount = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      selectedDate: ['', Validators.required],
      ticketType: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });

    this.bookingForm.get('selectedDate')?.valueChanges.subscribe(dateStr => {
      if (dateStr) {
        const date = new Date(dateStr);
        const day = date.getDay();
        // 0 is Sunday, 6 is Saturday
        this.isWeekend = (day === 0 || day === 6);
      }
    });
  }

  addToCart() {
    if (this.bookingForm.invalid) return;

    const values = this.bookingForm.value;
    const ticket = this.ticketTypes.find(t => t.id === values.ticketType);

    if (ticket) {
      const existingItem = this.cart.find(item => item.ticket.id === ticket.id);
      if (existingItem) {
        existingItem.quantity += values.quantity;
      } else {
        this.cart.push({ ticket, quantity: values.quantity });
      }

      // Reset quantity and selection
      this.bookingForm.patchValue({ quantity: 1, ticketType: '' });
    }
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  applyCoupon() {
    if (this.couponCode.toUpperCase() === 'SUMMER20') {
      this.discount = 0.2; // 20% off
    } else if (this.couponCode.toUpperCase() === 'FLAT500') {
      this.discount = 500; // Flat discount
    } else {
      this.discount = 0;
      alert('Invalid coupon code');
    }
  }

  getSubtotal(): number {
    const base = this.cart.reduce((total, item) => total + (item.ticket.price * item.quantity), 0);
    return this.isWeekend ? base * this.weekendMultiplier : base;
  }

  getDiscountAmount(): number {
    const subtotal = this.getSubtotal();
    if (this.discount > 0 && this.discount < 1) {
      return subtotal * this.discount; // Percentage
    } else {
      return this.discount; // Flat
    }
  }

  getTotal(): number {
    const total = this.getSubtotal() - this.getDiscountAmount();
    return Math.max(0, total); // Prevent negative totals
  }

  proceedToPayment() {
    if (this.cart.length === 0) return;

    // Razorpay mock integration logic goes here
    alert('Redirecting to secure Razorpay checkout gateway for ₹' + this.getTotal());
  }
}
