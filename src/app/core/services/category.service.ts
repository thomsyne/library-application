import { CategoryListModel, CategoryModel } from './../../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpOptions, ServiceUrls } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly http: HttpClient) { }

  categoryList(): Observable<CategoryListModel[]> {
    return this.http.get<CategoryListModel[]>(`${environment.apiUrl}${ServiceUrls.categoryUrl}`, HttpOptions)
  }
  
  categoryCreate(payload: CategoryModel): Observable<any> {
    return this.http.post<CategoryModel>(`${environment.apiUrl}${ServiceUrls.categoryUrl}`, payload, HttpOptions)
  }
  
  categoryEdit(payload: CategoryModel, id?: string): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${ServiceUrls.categoryUrl}/${id}`, payload, HttpOptions)
  }
  
  categoryDelete(id?: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}${ServiceUrls.categoryUrl}/${id}`, HttpOptions)
  }

}
