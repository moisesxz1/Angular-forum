import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';
import { Global } from '../../services/global';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';




@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public url: string;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.url = Global.url;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      let id = params['id'];
      this.articleService.getArticle(id).subscribe(
        response => {

          if (response.article) this.article = response.article;

          else {
            this.router.navigate(['/articuloNoExiste']);
          }

        },
        error => {
          console.log(<any>error);
        }
      );
    })
  }

  delete(id) {

    swal({
      title: "Estas seguro?",
      text: "Una vez borrado el articulo no podras recuperarlo!",
      icon: "warning",
      buttons: [true,true],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {

          this.articleService.delete(id).subscribe(
            response => {
              swal("El articulo ha sido borrado", {
                icon: "success",
              });
      
              this.router.navigate(['/blog']);
            },
            error => {
              console.log(<any>error);
            }
          )
          
          
        } else {
          swal("Tranquilo, nada se ha borrado");
        }
      });
  }

}
