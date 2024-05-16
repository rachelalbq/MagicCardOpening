import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollectionService } from '../../../../services/collection.service';
import { ICollection } from '../../../../models/collection';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-collection-filters',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './collection-filters.component.html',
  styleUrl: './collection-filters.component.scss'
})
export class CollectionFiltersComponent {

  name: string = ''
  block: string = ''
  @Output() collection = new EventEmitter<ICollection[]>()

  constructor(private collectionService: CollectionService) { }

  searchCollection() {
    if (this.block) {
      const queryParams = `?name=${this.name}&block=${this.block}`
      this.collectionService.getCollection(queryParams)
        .subscribe((response: any) => {
          const responseArray = Object.values(response)
          this.collection.emit(responseArray as ICollection[])
        })
    }
  }
}
