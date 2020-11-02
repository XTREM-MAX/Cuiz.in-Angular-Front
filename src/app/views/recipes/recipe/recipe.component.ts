import { Recipe } from './../../../models/recipes/Recipe';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {

  @Input() recipe: Recipe;
  @Input() index: number;
  @Input() delayAnimation: boolean;

  constructor() { }

}
