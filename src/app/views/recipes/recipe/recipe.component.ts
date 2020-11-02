import { Recipe } from './../../../models/recipes/Recipe';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
