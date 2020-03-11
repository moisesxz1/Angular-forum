import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Global } from '../../services/global';



@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {


  public article: Article;
  public status: string;
  public is_edit: boolean;
  public page_title: string;
  public url: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "10",
    uploadAPI: {
      url: Global.url + 'upload-image',

    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la imagen del articulo...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.article = new Article('', '', '', null, null);
    this.is_edit = true;
    this.page_title = 'Editar articulo';
    this.url = Global.url;
  }

  ngOnInit() {

    this.getArticle();
  }

  onSubmit() {

    this.articleService.update(this.article._id, this.article).subscribe(
      response => {

        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;

          //Alerta
          swal(
            'Articulo editado',
            'El articulo se ha editado correctamente',
            'success'
          );

          this.router.navigate(['/blog/articulo', this.article._id]);
        }else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);

        swal(
          'Edicion fallida',
          'El articulo no se ha podido editar correctamente',
          'error'
        );
      }
    )
  }


  imageUpload(data) {

    let image_data = JSON.parse(data.response);
    this.article.image = image_data.image;
  }

  getArticle() {

    this.route.params.subscribe(params => {

      let id = params['id'];

      this.articleService.getArticle(id).subscribe(
        response => {

          if (response.article) {
            console.log(response.article);
            this.article = response.article;
          } else {
            this.router.navigate(['/Articulo sin existencia']);
          }
        },
        error => {

          this.status = 'error';
          console.log(<any>error);
        }
      )
    })
  }
  
}
