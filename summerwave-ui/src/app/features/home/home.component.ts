import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    this.titleService.setTitle('Best Family Waterpark | Buy Waterpark Tickets Online | SummerWave');
    this.metaService.addTags([
      { name: 'description', content: 'Experience the ultimate weekend getaway at SummerWave. Buy waterpark tickets online for family, kids, and adults. Enjoy thrill rides, wave pools, and exciting amusement park attractions.' },
      { name: 'keywords', content: 'waterpark tickets, family waterpark, buy waterpark tickets online, weekend getaway, amusement park' }
    ]);
  }
}
