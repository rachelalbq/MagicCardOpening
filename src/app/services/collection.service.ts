import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private http = inject(HttpClient)

  API_URL = 'https://api.magicthegathering.io/v1/sets'
  

  constructor() {}

  getCollection(queryParams: string){
    return this.http.get(`${this.API_URL}${queryParams}`)
  }
}