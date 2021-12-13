import { HttpHeaders } from '@angular/common/http';

export const HttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

export const ServiceUrls = {
    bookUrl: 'books',
    categoryUrl: 'categories'
}

export const AppRoutes = {
    books: 'books',
    categories: 'categories'
}
