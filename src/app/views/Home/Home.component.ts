import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  public parseInt = window.parseInt;

  @ViewChild("view")
  public view: ElementRef;

  constructor(public client: ClientService) { }

  ngAfterViewInit() {
    let viewElement = this.view.nativeElement as HTMLElement;
    viewElement.addEventListener("touchmove", (event) => {
      
    });


    let pressedElement: HTMLElement;
    let started = {
      x: 0,
      y: 0
    }
    viewElement.addEventListener("mousedown", (event) => {
      let target = event.target as HTMLElement;
      while (target != null && target.nodeName != "SECTION")
        target = target.parentElement;
      
      if (target) {
        pressedElement = target;
        started = {
          x: event.clientX,
          y: event.clientY
        }
      }
    });
    viewElement.addEventListener("mouseup", (event) => {
      if (pressedElement)
        if (event.clientX - started.x > 100) {
          pressedElement.style.transition = "transform .3s cubic-bezier(.3,.83,.52,.92), opacity .3s";
          pressedElement.style.transform = "translateX(400px) scale(.95) rotateZ(5deg)";
          pressedElement.style.opacity = ".01";
          //like
          this.client.likeRecipe(this.client.homeRecipe.recipe.nameSlugify);
        }else if (event.clientX - started.x < -100) {
          pressedElement.style.transition = "transform .3s cubic-bezier(.3,.83,.52,.92), opacity .3s";
          pressedElement.style.transform = "translateX(-400px) scale(.95) rotateZ(-5deg)";
          pressedElement.style.opacity = ".01";
          //like
          this.client.likeRecipe(this.client.homeRecipe.recipe.nameSlugify);
        } else {
          pressedElement.style.transition = pressedElement.style.transform = "";
        }
      pressedElement = undefined;
    });
    viewElement.addEventListener("mousemove", (event) => {
      if (pressedElement) {
        let diff = event.clientX - started.x;
        pressedElement.style.transition = "initial";
        pressedElement.style.transform = `translateX(${(diff > 0 ? 2 : -2) * Math.pow(Math.abs(diff), .5)}px) rotateZ(${(diff > 0 ? 2 : -2)/20  * Math.pow(Math.abs(diff), .5)}deg) scale(${1 - 2/2000 * Math.pow(Math.abs(diff), .5)})`;
      }
    });
  }

}
