import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  public parseInt = window.parseInt;

  transitioning: boolean;

  @ViewChild("view")
  public view: ElementRef;

  @ViewChild("lastcard")
  public lastcard: ElementRef;
  @ViewChild("secondcard")
  public secondcard: ElementRef;
  @ViewChild("firstcard")
  public firstcard: ElementRef;

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
      while (target != null && target != this.firstcard.nativeElement)
        target = target.parentElement;

      if (target) {
        pressedElement = target;
        started = {
          x: event.clientX,
          y: event.clientY
        }
      }
    });
    viewElement.addEventListener("touchstart", (event) => {
      let target = event.target as HTMLElement;
      while (target != null && target != this.firstcard.nativeElement)
        target = target.parentElement;

      if (target) {
        pressedElement = target;
        started = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientX
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
          this.loadNewCard(true);
        }else if (event.clientX - started.x < -100) {
          pressedElement.style.transition = "transform .3s cubic-bezier(.3,.83,.52,.92), opacity .3s";
          pressedElement.style.transform = "translateX(-400px) scale(.95) rotateZ(-5deg)";
          pressedElement.style.opacity = ".01";
          this.loadNewCard(false);
        } else {
          pressedElement.style.transition = pressedElement.style.transform = "";
        }
      pressedElement = undefined;
    });
    viewElement.addEventListener("touchend", (event) => {
      if (pressedElement)
        if (event.changedTouches[0].clientX - started.x > 100) {
          pressedElement.style.transition = "transform .3s cubic-bezier(.3,.83,.52,.92), opacity .3s";
          pressedElement.style.transform = "translateX(400px) scale(.95) rotateZ(5deg)";
          pressedElement.style.opacity = ".01";
          //like
          this.loadNewCard(true);
        }else if (event.changedTouches[0].clientX - started.x < -100) {
          pressedElement.style.transition = "transform .3s cubic-bezier(.3,.83,.52,.92), opacity .3s";
          pressedElement.style.transform = "translateX(-400px) scale(.95) rotateZ(-5deg)";
          pressedElement.style.opacity = ".01";
          this.loadNewCard(false);
        } else {
          pressedElement.style.transition = pressedElement.style.transform = "";
        }
      pressedElement = undefined;
    });
    viewElement.addEventListener("touchmove", (event) => {
      if (pressedElement) {
        let diff = event.changedTouches[0].clientX - started.x;
        if(pressedElement.style.transition != "initial")
          pressedElement.style.transition = "initial";
        pressedElement.style.transform = `translateX(${(diff > 0 ? 2 : -2) * Math.pow(Math.abs(diff), .5)}px) rotateZ(${(diff > 0 ? 2 : -2)/20  * Math.pow(Math.abs(diff), .5)}deg) scale(${1 - 2/2000 * Math.pow(Math.abs(diff), .5)})`;
      }
    });
    viewElement.addEventListener("mousemove", (event) => {
      if (pressedElement) {
        let diff = event.clientX - started.x;
        if(pressedElement.style.transition != "initial")
          pressedElement.style.transition = "initial";
        pressedElement.style.transform = `translateX(${(diff > 0 ? 2 : -2) * Math.pow(Math.abs(diff), .5)}px) rotateZ(${(diff > 0 ? 2 : -2)/20  * Math.pow(Math.abs(diff), .5)}deg) scale(${1 - 2/2000 * Math.pow(Math.abs(diff), .5)})`;
      }
    });
  }

  latestSkip: string[] = [];

  async loadNewCard(liked: boolean) {
    setTimeout(() => {
    this.transitioning = true;
      this.firstcard.nativeElement.style.transform = this.firstcard.nativeElement.style.transition = this.firstcard.nativeElement.style.opacity = "";
      this.firstcard.nativeElement.className = "end notransition hiding";
      this.secondcard.nativeElement.className = "second notransition";
      this.lastcard.nativeElement.className = "last notransition";
      setTimeout(() => {
        this.firstcard.nativeElement.className = "last notransition hiding";
        this.secondcard.nativeElement.className = "";
        this.lastcard.nativeElement.className = "second";
        setTimeout(() => {
          this.firstcard.nativeElement.className = "notransition hiding";
          this.firstcard.nativeElement.style.transformOrigin = "center"
          this.firstcard.nativeElement.style.transform = "rotateY(180deg)"
          this.firstcard.nativeElement.style.boxShadow = "-10px 0px 20px -15px rgba(0, 0, 0, 0.14)"
          this.secondcard.nativeElement.className = "second notransition";
          this.lastcard.nativeElement.className = "last notransition";
          this.transitioning = false;
          setTimeout(() => {
            this.firstcard.nativeElement.style.transition = "transform .5s cubic-bezier(.21,.96,.52,1.47)";
            setTimeout(() => {
              this.firstcard.nativeElement.className = "";
            }, 100);
            this.firstcard.nativeElement.className = "hiding";
            this.firstcard.nativeElement.style.transform = ""
            this.firstcard.nativeElement.style.boxShadow = "";
            setTimeout(() => {
              this.firstcard.nativeElement.style.transition = this.firstcard.nativeElement.style.transformOrigin = "";
            }, 450);
          }, 50);
        }, 400);
      }, 10);
    }, 400);

    this.latestSkip.push(this.client.homeRecipe.recipe.nameSlugify);
    if (liked) {
      try {
        this.client.likeRecipe(this.client.homeRecipe.recipe.nameSlugify);
      } catch (e) { }
      for (let suggestion of this.client.homeRecipe.suggestions) {
        if (!this.latestSkip.includes(suggestion.nameSlugify)) {
          this.client.homeRecipe = await this.client.getRecipe(suggestion.nameSlugify);
          break;
        }
      }
    }else
      this.client.homeRecipe = await this.client.getRecipe((await this.client.random()).recipe.nameSlugify);
  }

}
