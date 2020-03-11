import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { Global } from './global';

@Injectable()
export class ArticleService {

    public url: string;
    constructor(
        private http: HttpClient
    ) {

        this.url = Global.url;
    }

    getArticles(last: any = null): Observable<any> {


        var articles = 'articles';

        if (last != null) articles = 'articles/true';



        return this.http.get(this.url + articles);
    }

    getArticle(articleId): Observable<any> {

        return this.http.get(this.url + 'article/' + articleId);
    }

    search(searchString): Observable<any> {

        return this.http.get(this.url + 'search/' + searchString);
    }

    create(article): Observable<any> {

        //Convertir el objeto a un JSON string
        let params = JSON.stringify(article);

        //Definir las cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Hacer peticion AJAX
        return this.http.post(this.url+'save', params, { headers: headers });
    }

    update(id, article):Observable<any>{

        let params = JSON.stringify(article);

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.put(this.url+'article/'+id, params, {headers: headers});
    }

    delete(id):Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.delete(this.url+'article/'+id, {headers:headers});
    }
}