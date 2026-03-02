import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  activeTab = 'overview'; // 'overview', 'bookings', 'coupons'

  metrics = {
    totalRevenue: 1245000,
    totalBookings: 842,
    visitorsToday: 156,
    capacityUtilized: 78
  };

  recentBookings = [
    { id: 'SW-10842', customer: 'John Doe', tickets: 4, amount: 2999, status: 'CONFIRMED', date: 'Oct 24, 2024' },
    { id: 'SW-10843', customer: 'Sarah Smith', tickets: 2, amount: 1998, status: 'PENDING', date: 'Oct 25, 2024' },
    { id: 'SW-10844', customer: 'Mike Johnson', tickets: 1, amount: 999, status: 'CANCELLED', date: 'Oct 25, 2024' },
    { id: 'SW-10845', customer: 'Emma Wilson', tickets: 5, amount: 4995, status: 'CONFIRMED', date: 'Oct 26, 2024' },
  ];

  coupons = [
    { code: 'SUMMER20', type: 'PERCENTAGE', value: 20, usage: 145, status: 'ACTIVE' },
    { code: 'FLAT500', type: 'FLAT', value: 500, usage: 82, status: 'ACTIVE' },
    { code: 'WINTER10', type: 'PERCENTAGE', value: 10, usage: 300, status: 'EXPIRED' },
  ];

  ngOnInit() { }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  refundBooking(id: string) {
    if (confirm('Issue full refund for booking ' + id + '?')) {
      const b = this.recentBookings.find(x => x.id === id);
      if (b) b.status = 'REFUNDED';
    }
  }
}
