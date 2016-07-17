'use strict';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { CategoriesService } from '../../services/category.service';

@Component({
  selector: 'recipes',
  template: require('./recipes.component.html')
})
export class RecipesComponent implements OnInit {

  public recipes: any;
  public categories: any;
  public categoryID: any;

  constructor(private router: Router,
              private recipesService: RecipesService,
              private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.recipesService.getItems()
        .then(
          recipes => this.recipes = recipes,
          error => this.errorMessage = <any>error);
    this.categoriesService.getItems()
        .then(
          categories => this.categories = categories,
          error => this.errorMessage = <any>error);

  }

  filterCategories(categoryID) {
    console.log(categoryID);
    if(categoryID == 'All') {
      this.recipesService.getItems().then(recipes => this.recipes = recipes);
    } else {
      this.recipesService.getItems(categoryID).then(recipes => this.recipes = recipes);
    }
  }

  editDetails(id, edit) {
    if(edit == false) {
      this.router.navigate(['/edit', id]);
    } else {
      this.router.navigate(['/edit', id, 'true']);
    }

  }

  addNewRecipe(event) {
    event.stopPropagation();
    this.router.navigate(['/add']);
  }

  deleteRecipe(recipe, event) {
    event.stopPropagation();

    this.recipesService
        .delete(recipe)
        .then(res => {
          this.recipes = this.recipes.filter(r => r !== recipe);
        })
        .catch(error => this.error = error);
  }

}
