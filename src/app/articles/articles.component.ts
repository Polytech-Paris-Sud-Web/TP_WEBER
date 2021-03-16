import { Component, Input, OnInit } from '@angular/core';
import {ArticleService} from '../article.service';
import {Article} from '../models/article.model';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  private _articlesSubcription?: Subscription;
  articles?: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this._articlesSubcription = this.articleService.getArticles().subscribe(articles => this.articles = articles);
  }

  public refreshArticles(): void{
    this._articlesSubcription = this.articleService.getArticles().subscribe(articles => this.articles = articles);
  }

  delete(article: Article) {
    if (confirm('Are you sure to delete ?')){
      this.articleService.deleteArticle(article.id!).subscribe( res =>
      {this.refreshArticles(); });
    }
  }
}
