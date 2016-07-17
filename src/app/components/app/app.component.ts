'use strict';

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { CategoriesService } from '../../services/category.service';
import { FoodItemService } from '../../services/fooditem.service';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  providers: [RecipesService, CategoriesService, FoodItemService],
  template: require('./app.component.html')
})

export class AppComponent {

  constructor() {}
}
