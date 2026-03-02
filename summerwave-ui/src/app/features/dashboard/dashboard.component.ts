import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Booking {
  id: string;
  date: Date;
  tickets: number;
  totalAmount: number;
  status: 'CONFIRMED' | 'CANCELLED';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  upcomingBookings: Booking[] = [];
  pastBookings: Booking[] = [];

  ngOnInit() {
    // Mock Data
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const lastMonth = new Date(today);
    lastMonth.setDate(today.getDate() - 30);

    this.upcomingBookings = [
      { id: 'SW-10842', date: nextWeek, tickets: 4, totalAmount: 2999, status: 'CONFIRMED' }
    ];

    this.pastBookings = [
      { id: 'SW-09211', date: lastMonth, tickets: 2, totalAmount: 1998, status: 'CONFIRMED' },
      { id: 'SW-08144', date: new Date(today.setMonth(today.getMonth() - 2)), tickets: 1, totalAmount: 999, status: 'CANCELLED' }
    ];
  }

  cancelBooking(bookingId: string) {
    if (confirm('Are you sure you want to cancel this booking? Refund policy applies based on cancellation time.')) {
      const b = this.upcomingBookings.find(x => x.id === bookingId);
      if (b) {
        b.status = 'CANCELLED';
        this.pastBookings.unshift(b);
        this.upcomingBookings = this.upcomingBookings.filter(x => x.id !== bookingId);
        alert('Booking cancelled successfully.');
      }
    }
  }

  downloadTicket(bookingId: string) {
    alert(`Downloading Ticket PDF with QR code for booking ${bookingId}...`);
  }
}
