'use strict';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { CategoriesService } from '../../services/category.service';
import { FoodItemService } from '../../services/fooditem.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'recipe-detail',
  template: require('./recipe-detail.component.html')
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  public sub: any;
  public recipe: any;
  public categories: any;
  public foodItems: any;
  public editing: Boolean;
  public createdNew: Boolean;
  public recipeErrors = undefined;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private recipesService: RecipesService,
              private categoriesService: CategoriesService
              private foodItemService: FoodItemService) {}

  ngOnInit() {

    this.foodItemService.getItems()
        .then(foodItems => this.foodItems = foodItems);

    this.categoriesService.getItems()
        .then(categories => this.categories = categories);

    this.sub = this.route.params.subscribe(params => {
      if(params['id']) {
        let id = params['id'];
        console.log(id);
        this.recipesService.getItem(id)
            .then(recipe => {
              this.recipe = recipe;
              this.editing = (params['editing'] == 'true') ? true : false;
              this.createdNew = false;
            });
      } else {
        this.recipe = new Recipe();
        this.editing = true;
        this.createdNew = true;
      }
    });
  }

  reset() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.recipeErrors = undefined;
    console.dir(this.recipe);
    this.recipesService
        .saveRecipe(this.recipe, this.createdNew)
        .then(recipe => {
          this.recipe = recipe;
          this.editing = false;
        }, error => this.handleRecipeError(error));
  }

  addStep() {
    this.recipe.steps.push({ description: "New step"});
  }

  addIngredient() {
    this.recipe.ingredients.push({ amount: "", condition: "", foodItem: ""});
  }

  deleteStep(step) {
    this.recipe.steps = this.recipe.steps
                            .filter(stepCurrent => stepCurrent.description !== step.description);
  }

  deleteIngredient(ingredient) {
    this.recipe.ingredients = this.recipe.ingredients
                                         .filter(ingredientCurrent => ingredientCurrent.foodItem !== ingredient.foodItem);
  }


  private handleRecipeError(error) {
    let errorArr = [];
    for(let err in error.errors) {
      errorArr.push(error.errors[err]);
    }
    console.log(errorArr);
    this.recipeErrors = errorArr;
  }

}
