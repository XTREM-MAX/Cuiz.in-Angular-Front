import { Recipe } from './../../models/recipes/Recipe';
import { AfterViewInit, Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements AfterViewInit {

  initialized = false;
  constructor(public client: ClientService) { }

  ngAfterViewInit() {
    this.initialized = true;
  }

}
