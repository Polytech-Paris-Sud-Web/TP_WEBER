import { Injectable } from '@angular/core';
import {Article} from './models/article.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) {
  }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }

  public deleteArticle(id: number){
    return this.http.delete(this.url + '/' + id);
  }

  public postArticle(newArticle: Article): Observable<any>{
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(newArticle);
    return this.http.post(this.url, body, {'headers': headers});
  }
}
