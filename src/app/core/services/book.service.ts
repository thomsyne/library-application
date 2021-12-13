import { HttpOptions } from './../constants/app.constants';
import { BookListModel, BookModel } from './../../models/book.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceUrls } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class BookService {

constructor(private readonly http: HttpClient) { }

bookList(): Observable<BookListModel[]> {
  return this.http.get<BookListModel[]>(`${environment.apiUrl}${ServiceUrls.bookUrl}`, HttpOptions)
}

bookCreate(payload: BookModel): Observable<any> {
  return this.http.post<BookModel>(`${environment.apiUrl}${ServiceUrls.bookUrl}`, payload, HttpOptions)
}

bookEdit(payload: BookModel, id?: string): Observable<any> {
  return this.http.put<any>(`${environment.apiUrl}${ServiceUrls.bookUrl}/${id}`, payload, HttpOptions)
}

bookDelete(id?: string): Observable<any> {
  return this.http.delete<any>(`${environment.apiUrl}${ServiceUrls.bookUrl}/${id}`, HttpOptions)
}

}
