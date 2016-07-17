'use strict';

import { provideRouter, RouterConfig }  from '@angular/router';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { RecipeDetailComponent } from '../components/recipe-detail/recipe-detail.component';

const routes: RouterConfig = [
  // {
  //   path: '',
  //   redirectTo: '/#',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: RecipesComponent,
  },
  {
    path: 'edit/:id',
    component: RecipeDetailComponent
  },
  {
    path: 'edit/:id/:editing',
    component: RecipeDetailComponent
  },
  {
    path: 'add',
    component: RecipeDetailComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
