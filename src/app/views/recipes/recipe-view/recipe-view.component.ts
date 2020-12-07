import { Recipe } from './../../../models/recipes/Recipe';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
  animations: [
    trigger('openRecipeView', [
      transition(':enter', [
        style({
          top: '80vh'
        }),
        animate('0.3s ease', style({
          top: '70px',
        })),
      ]),
      transition(':leave', [
        style({
          top: '70px',
          transform: "translate(0)"
        }),
        animate('.3s ease', style({
          top: '80vh',
          transform: "translate(0)"
        })),
      ]),
    ]),
  ],
})
export class RecipeViewComponent implements OnInit, OnDestroy {

  @Input()
  public recipe: Recipe;

  @Output()
  public close: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSelfMoving(drag: CdkDragMove) {
    const y = drag.source.element.nativeElement.style.transform.split(",")[1];
    if (drag.delta.y == 1 && parseInt(y) > 100) {
      this.close.emit();
      console.log("close");
    }
  }

}
