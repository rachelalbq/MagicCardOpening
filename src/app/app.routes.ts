import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionSearchPageComponent } from './pages/collection-search-page/collection-search-page.component';
import { CardDisplayPageComponent } from './pages/card-display-page/card-display-page.component';
import { CollectionFiltersComponent } from './pages/collection-search-page/components/collection-filters/collection-filters.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:  CollectionSearchPageComponent},
  { path: 'cards', component: CardDisplayPageComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

