import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Global } from '../../services/global';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {
  
  public status: string;
  public articles: Array<Article>;
  public url: string;

  constructor(
    private articleService: ArticleService
  ) {

    this.url = Global.url;
   }

  ngOnInit() {

    this.articleService.getArticles().subscribe(
      response => {

        if(response.articles) this.articles = response.articles;
        
      },
      error => {

        this.status = 'error';
        console.log(<any>error);
      }
    )
  }

}
