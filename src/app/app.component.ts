import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cuiz.in';
  constructor(public router: Router) {
    //Avoid touch default browser actions

    let lastCanceledTouches: Map<number, { element: HTMLElement, date: number }> = new Map();
    document.addEventListener('touchstart', e => {
      if ((e.target as HTMLElement)?.getAttribute("draggable") === "false") {
        //If the client press an object that is not draggable, we cancel the press
        //It is made in order to avoid the images being popped up when long pressed on phone...

        //But we register that the client pressed in order to simulate a click if the user release the click before 500 ms (in that case it become a long press, not a click)
        lastCanceledTouches.set(e.changedTouches[0].identifier, { element: e.target as HTMLElement, date: Date.now() });
        
        e.preventDefault();
        return false;
      }
    }, { passive: false });
    document.addEventListener('touchend', e => {
      let id = e.changedTouches[0].identifier;
      if (lastCanceledTouches.has(id)) {
        let click = lastCanceledTouches.get(id);
        //If the client started to press here and finished also here in less that 500ms, we simulate the click
        if (click.element === e.target && Date.now() < click.date + 500)
          (e.target as HTMLElement).click();
        
        lastCanceledTouches.delete(id);
      }
    });
    document.addEventListener('touchmove', e => { e.preventDefault(); return false }, { passive: false });//Avoid touch default browser actions
    document.addEventListener('contextmenu',  e => e.preventDefault()); //Avoid right clicking & long press
  }
}
