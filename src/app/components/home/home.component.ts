import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
})
export class HomeComponent implements OnInit {

  public title: string;
  public articles: Array<Article>;
  public status: string;
  constructor(

    private articleService: ArticleService
  ) {
    this.title = 'Ultimos articulos';
  }

  ngOnInit() {

    this.articleService.getArticles(true).subscribe(
      response => {

        if (response.articles) this.articles = response.articles;

      },
      error => {

        this.status = 'error';
        console.log(<any>error);
      }
    )
  }

}
