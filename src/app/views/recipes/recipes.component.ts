import { Recipe } from './../../models/recipes/Recipe';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, AfterViewInit {

  initialized = false;

  focusedRecipe: Recipe;

  constructor(public client: ClientService) { }

  public ngOnInit(): void {
  }
  public ngAfterViewInit(): void {
    this.initialized = true;
  }
}
