import { Component } from '@angular/core';
import { CollectionFiltersComponent } from './components/collection-filters/collection-filters.component';
import { CommonModule } from '@angular/common';
import { CollectionService } from '../../services/collection.service';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Card, CardSet, IBoosters, ICollection } from '../../models/collection';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-collection-search-page',
  standalone: true,
  imports: [CommonModule, CollectionFiltersComponent, RouterModule, HttpClientModule],
  templateUrl: './collection-search-page.component.html',
  styleUrl: './collection-search-page.component.scss'
})
export class CollectionSearchPageComponent {

  collectionItems: ICollection[] = []
  collectionSelection: CardSet[] = []
  finalCreatureCards: IBoosters[] = []
  loading: boolean = false
  error: string | null = null
  emptyList: string | null = null

  constructor(private collectionService: CollectionService, private router: Router) { }

  handleCollection(e: any) {
    const collection = e
    this.loading = true
    this.collectionItems = collection[0] as ICollection[]
    if (this.collectionItems.length > 0) {
      this.emptyList = null
    } else {
      this.emptyList = 'A coleção está vazia!'
    }
    this.collectionSelection = []
    this.loading = false
  }

  handleCardClick(item: ICollection) {
    const itemName = item.name.replace(/\s/g, '');
    const queryParams = `?name=${itemName}|origins`;
    this.collectionService.getCollection(queryParams)
      .pipe(
        catchError((err) => {
          this.error = 'Ocorreu um erro ao buscar os dados. Por favor, tente novamente.';
          return of(null);
        })
      )
      .subscribe((response: any) => {
        this.collectionItems = [];
        const collection = response.sets
        this.collectionSelection = collection as CardSet[];
      });
  }

  handleCollectionClick(item: CardSet): void {

    this.loading = true
    this.error = null

    const queryParams = `/${item.code}/booster`;
    const creatureCards: IBoosters[] = [];
    const neededCreatures = 30


    const fetchCreatures = () => {
      this.collectionService.getCollection(queryParams)
        .pipe(
          catchError((err) => {
            this.error = 'Ocorreu um erro ao buscar os dados. Por favor, tente novamente.'
            this.loading = false;
            return of(null)
          })
        )
        .subscribe((response: any) => {
          if (response) {
            const cards = response.cards
            const creatures = cards.filter((card: Card) => card.types.includes('Creature'))

            creatureCards.push(...creatures)

            if (creatureCards.length < neededCreatures) {
              fetchCreatures()
            } else {
              this.finalCreatureCards = creatureCards.slice(0, neededCreatures);
              const navigationExtras: NavigationExtras = {
                state: {
                  cards: this.finalCreatureCards
                }
              };
              this.loading = false
               this.router.navigate(['/cards'], navigationExtras)
            }
          }
        });
    };

    fetchCreatures()
  }
}
