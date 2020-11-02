import { Recipe } from './../../models/recipes/Recipe';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements AfterViewInit {

  recipes: Recipe[] = [
    new Recipe("Lasagne", "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/lasagnes-a-la-bolognaise-facile.jpg", 25, 2, "15/11/2009", "14:03"),
    new Recipe("Tartiflette", "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/lasagnes-a-la-bolognaise-facile.jpg", 1, 4, "14/05/2018", "21:35"),
    new Recipe("Truie", "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/lasagnes-a-la-bolognaise-facile.jpg", 55, 1, "21/08/2020", "05:12")
  ];
  initialized = false;
  constructor() {}

  ngAfterViewInit() {
    this.initialized = true;
  }

}
