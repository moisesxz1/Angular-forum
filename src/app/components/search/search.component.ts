import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {

  private articles: Article[];
  public search: string;

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      var search = params['search'];

      this.search = search;

      this.articleService.search(search).subscribe(
        response => {

          if (response.articles) this.articles = response.articles;


          else this.articles = [];
        },
        error => {
          console.log(<any>error);
          this.articles = [];
        }
      )
    })
  }

}
