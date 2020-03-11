import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';  
import { Global } from '../../services/global';


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article: Article;
  public status: string;
  public page_title: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "10",
    uploadAPI: {
      url: Global.url+'upload-image',
      
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
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.article = new Article('', '', '', null, null);
    this.page_title = 'Crear articulo';
  }

  ngOnInit() {
  }

  onSubmit() {

    this.articleService.create(this.article).subscribe(
      response => {

        if (response.status == 'success') {

          console.log(this.article);
          this.status = 'success';
          this.article = response.article;

          //Alerta
          swal(
            'Articulo creado',
            'El articulo se ha creado correctamente',
            'success'
          );

          this.router.navigate(['/home']);
        } else {
          this.status = 'error'
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

  imageUpload(data){

    let image_data = JSON.parse(data.response);
    this.article.image = image_data.image;
  }
}
