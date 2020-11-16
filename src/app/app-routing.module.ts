import { NotLoggedActivate } from './router/conditions/NotLoggedActivate';
import { LoginActivate } from './router/conditions/LoginActivate';
import { LoginComponent } from './views/login/login.component';
import { RecipesComponent } from './views/recipes/recipes.component';
import { HomeComponent } from './views/Home/Home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './views/account/account.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/home', canActivate: [LoginActivate] },
      { path: 'home', component: HomeComponent, canActivate: [LoginActivate] },
      { path: 'recipes', component: RecipesComponent, canActivate: [LoginActivate]  },
			{ path: 'login', component: LoginComponent, canActivate: [NotLoggedActivate] },
			{ path: 'account', component: AccountComponent, canActivate: [LoginActivate] }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
