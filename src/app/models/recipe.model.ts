'use strict';

import { Ingredient } from './ingredient.model';
import { Step } from './step.model';


function randomString(length: number, acc: string = '') {

  let charCode: number;
  let caseAndtype = Math.floor(Math.random() * 3);

  if(caseAndtype == 0) {
    charCode = Math.floor(Math.random() * 10) + 48;
  } else if (caseAndtype == 1) {
    charCode = Math.floor(Math.random() * 26) + 65;
  } else if (caseAndtype == 2) {
    charCode = Math.floor(Math.random() * 26) + 97;
  }

  acc = acc.concat(String.fromCodePoint(charCode));

  if (acc.length == length) {
    return acc;
  } else {
    return randomString(length, acc); // Tail Call Optimized
  }

}

export class Recipe {
  // public name: string;
  // public description: string;
  // public category: string;
  // public prepTime: number;
  // public cookTime: number;
  // public ingredients: Ingredient[];
  // public steps: Step[];
  public _id: string;

  constructor(public name: string = "New Recipe",
              public description: string = "Description",
              public category: string = "category",
              public prepTime: number = 10,
              public cookTime: number = 10,
              public ingredients: Ingredient[] = [new Ingredient()],
              public steps: Step[] = [new Step()] ) {

    this._id = randomString(16);

  }
}
