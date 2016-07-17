'use strict';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BasicService } from './basic.service';
import './rxjs-operators';


@Injectable()
export class FoodItemService extends BasicService {

  constructor(http: Http) {
    super(http, 'api/fooditems');
  }

}
