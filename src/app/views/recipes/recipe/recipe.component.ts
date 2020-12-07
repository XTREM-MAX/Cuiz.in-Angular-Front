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
  @Input() delayAnimation: boolean;

  constructor() { }

  public ngOnInit(): void {
    this.recipe.created_date = new Date(this.recipe.created_date);
  }

  getDate(strDate: string): Date {
    return new Date(strDate);
  }

}
