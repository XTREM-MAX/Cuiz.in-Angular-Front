import { RecipesComponent } from './views/recipes/recipes.component';
import { HomeComponent } from './views/Home/Home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'home', component: HomeComponent },
      { path: 'recipes', component: RecipesComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
