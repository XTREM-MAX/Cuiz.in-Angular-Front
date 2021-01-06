import { RecipeDetails } from './../../services/models/RecipeDetails';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {

  public data: RecipeDetails;
  constructor(
    private readonly _client: ClientService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _domSanitizer: DomSanitizer
  ) { }

  async ngOnInit() {
    console.log("init");
    this._activatedRoute.params.subscribe(async params => {
      console.log(params.id);
      this.data = await this._client.getRecipe(params.id);
      console.log(this.data);
    });
  }

  getProtectedUrl(url: string): SafeUrl {
    return this._domSanitizer.bypassSecurityTrustUrl(url);
  }

  getIconFromId(id: string) {
    return this.data.recipe.ingredients.information.find(el => el._id == id);
  }

}
