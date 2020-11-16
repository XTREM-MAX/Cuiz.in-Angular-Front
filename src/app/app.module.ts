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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { InputFieldComponent } from './views/account/input-field/input-field.component';
import { MatIconModule } from "@angular/material/icon";
import { AccountComponent } from './views/account/account.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		BottombarComponent,
		BottomBarButtonComponent,
		RecipesComponent,
		RecipeComponent,
		HomeComponent,
		LoginComponent,
		InputFieldComponent,
		AccountComponent,
	],
	providers: [
		LoginActivate,
		NotLoggedActivate,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		BrowserAnimationsModule,
		MatRippleModule,
		MatInputModule,
		MatIconModule,
		MatSnackBarModule,
		FormsModule,
		HttpClientModule,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
