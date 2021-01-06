import { RecipeDetails } from './../../services/models/RecipeDetails';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ClientService } from '../../services/client.service';
import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {

  public data: RecipeDetails;
  dragPosition = {x: 0, y: 0};
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
  dropped(e: CdkDragRelease) {
      this.totalMovedBefore = this.totalMoved;
      console.log(e)
      let childs = e.source.element.nativeElement.children;
      let width = childs[0].clientWidth + 8;
      let current = Math.round(-this.totalMoved/width);
  
      this.dragPosition = { ...this.dragPosition, x: -current * width};
      
      for (let index = 0; index < childs.length; index++) {
        let child = childs[index] as HTMLElement;
        child.style.opacity = (Math.min(1 - Math.max(0, current - index), 1 - Math.max(0, index - current))*3).toString();
      }
  }

  totalMoved = 0;
  totalMovedBefore = 0;
  dragged(e:CdkDragMove) {
    this.totalMoved = this.totalMovedBefore + e.distance.x;
    let childs = e.source.element.nativeElement.children;
    let width = childs[0].clientWidth + 8;
    let current = -this.totalMoved/width;
    console.log(current);
    for (let index = 0; index < childs.length; index++) {
      let child = childs[index] as HTMLElement;
      child.style.opacity = (Math.min(1 - Math.max(0, current - index), 1 - Math.max(0, index - current))*3).toString();
    }
  }

  getProtectedUrl(url: string): SafeUrl {
    return this._domSanitizer.bypassSecurityTrustUrl(url);
  }

  getIconFromId(id: string) {
    return this.data.recipe.ingredients.information.find(el => el._id == id);
  }

}
