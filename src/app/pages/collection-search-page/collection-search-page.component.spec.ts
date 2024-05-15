import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CollectionSearchPageComponent } from './collection-search-page.component';
import { CollectionService } from '../../services/collection.service';
import { of } from 'rxjs';
import { ICollection } from '../../models/collection';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('CollectionSearchPageComponent', () => {
  let component: CollectionSearchPageComponent;
  let fixture: ComponentFixture<CollectionSearchPageComponent>;
  let collectionService: CollectionService;

  const mockItem: ICollection = {
    code: 'CP3',
    name: 'Magic Origins Clash Pack',
    type: 'expansion',
    releaseDate: '2015-07-17',
    block: 'Core Set',
    onlineOnly: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [CollectionService]
    }).compileComponents();

    collectionService = TestBed.inject(CollectionService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle collection', () => {
    const mockCollection = [
      [
        {
          block: "Amonkhet",
          booster: [],
          code: "AKH",
          name: "Amonkhet",
          onlineOnly: false,
          releaseDate: "2017-04-28",
          type: "expansion"
        }
      ]
    ]
    component.handleCollection(mockCollection);
    expect(component.collectionItems.length).toBe(1);
  });

  it('should handle card click', () => {
    const mockResponse = { sets: [{ code: 'CP3', name: 'Magic Origins Clash Pack' }] };
    spyOn(collectionService, 'getCollection').and.returnValue(of(mockResponse));

    component.handleCardClick(mockItem);
    expect(component.collectionItems.length).toBe(0);
    expect(component.collectionSelection.length).toBe(1);
    expect(component.error).toBeNull();
  });

  it('should handle collection click', () => {
    const mockResponse = { cards: [{ name: 'Creature Card', types: ['Creature'] }] };
    spyOn(collectionService, 'getCollection').and.returnValue(of(mockResponse));

    component.handleCollectionClick(mockItem);
    expect(component.error).toBeNull();
    expect(component.loading).toBeFalsy();


    fixture.detectChanges();
    expect(component.finalCreatureCards.length).toBeGreaterThan(0);
  });
});
