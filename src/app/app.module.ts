import { LoginActivate } from './router/conditions/LoginActivate';
import { NotLoggedActivate } from './router/conditions/NotLoggedActivate';
import { LoginComponent } from './views/login/login.component';
import { RecipeComponent } from './views/recipes/recipe/recipe.component';
import { HomeComponent } from './views/Home/Home.component';
import { BottomBarButtonComponent } from './components/bottombar/BottomBarButton/BottomBarButton.component';
import { RecipesComponent } from './views/recipes/recipes.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottombarComponent } from './components/bottombar/bottombar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BottombarComponent,
    BottomBarButtonComponent,
    RecipesComponent,
    RecipeComponent,
    HomeComponent,
    LoginComponent,
  ],
  providers: [
    LoginActivate,
    NotLoggedActivate,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
