'use strict';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import './rxjs-operators';

@Injectable()
export class BasicService {

  constructor(public http: Http, public url: string) {}

  getItems(): Promise<any[]> {
    return this.http.get(this.url)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);

  }

  getItem(id: string) {
    return this.getItems().then(items => {
        return items.find(item => item._id == id);
      },
      err => this.handleError(err)
    );
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(err: any) {
    let error = err.json();
    return Promise.reject(error);
  }

}
