import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../../models/collection';

@Component({
  selector: 'app-card-display-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-display-page.component.html',
  styleUrl: './card-display-page.component.scss'
})
export class CardDisplayPageComponent {

  creatureCards: Card[] = []

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation()
    if (navigation?.extras.state) {
      this.creatureCards = navigation.extras.state['cards']
    }
  }
}
