'use strict';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BasicService } from './basic.service';
import './rxjs-operators';


@Injectable()
export class RecipesService extends BasicService {

  constructor(http: Http) {
    super(http, 'api/recipes');
  }

  // Override
  getItems(categoryID): Promise<any[]> {
    var path = ''
    if(categoryID) {
      path = `${this.url}?category=${categoryID}`
    } else {
      path = `${this.url}`
    }
    return this.http.get(path)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);

  }

  saveRecipe(recipe, fresh: Boolean) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let method = (fresh == true) ? 'post' : 'put';

    if(fresh == true) {
      var url = `${this.url}`;
    } else {
      var url = `${this.url}/${recipe._id}`;
    }

    return this.http[method](url, recipe, headers)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

  delete(recipe) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${recipe._id}`;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

}
