import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ArticleService} from '../article.service';
import {Article} from '../models/article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent implements OnInit {

  articleForm: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) {
    this.articleForm = this.fb.group({
      title: ['Fake Title', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createArticle(){
    const { title, content, author } = this.articleForm.value;
    const newArticle: Article = {
      title,
      content,
      author
    };
    this.articleService.postArticle(newArticle).subscribe(articles => {
      this.router.navigate(['articles']);
    });
  }

}
