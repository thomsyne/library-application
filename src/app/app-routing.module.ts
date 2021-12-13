import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: async () =>
      ( await import('./components/landing/landing.module')).LandingModule
  },
  {
    path: 'lists',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          ( await import('./components/books/books.module')).BooksModule,
      },
      {
        path: '',
        loadChildren: async () =>
          ( await import('./components/categories/categories.module')).CategoriesModule,
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    component: LandingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
