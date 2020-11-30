import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Recipe } from '../models/recipes/Recipe';
import RecipeResponse from './models/RecipeResponse';
import UserData from './models/UserData';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  recipes: Recipe[] = [];
  base = "https://api.cuiz.in/";

  user: UserData = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

  get token(): string {
    return window.localStorage.token;
  }
  set token(token: string) {
    window.localStorage.token = token;
  }

  get logged(): boolean {
    return !!this.token?.length;
  }

  constructor(public http: HttpClient, public router: Router, public snackbar: MatSnackBar) { }

  async init() {
    if (this.token) {
      this.recipes = (await this.get("recipe/all")).payload.data;
      this.user = (await this.get("user/get")).payload;
    }
  }

  async likeRecipe(recipe_id: string) {
    let added: Recipe = (await this.post("recipe/add", {
      recipe_id
    })).payload;
    this.recipes.push(added);
  }
  async dislikeRecipe(recipe_id: string) {
    let added: Recipe = (await this.get(`/recipe/${recipe_id}/remove`)).payload;
    this.recipes.push(added);
  }

  async random(): Promise<RecipeResponse> {
    return (await this.get("recipe/random")).payload.recipe;
  }

  async getRecipe(recipe_id: string): Promise<RecipeResponse> {
    return (await this.get(`recipe/${recipe_id}/details`)).payload;
  }

  async update(field: string, value: string): Promise<"error" |"success"> {
    if (field !== "password" && value == this.user[field])//Not changed
      return undefined;
    
    let response = (await this.post("user/update", {
      [field]: value
    }));
    if (response.code !== 200)
      return "error";

    if(field !== "password")
      this.user[field] = value;
    
    this.token = response.payload.token;
    localStorage.setItem("user", JSON.stringify(this.user));
    return "success";
  }

  async login(email: string, password: string): Promise<"logged" | "bad_password" | "unknown_email"> {
    let response = await this.post("user/connexion", {
      email,
      password,
    }, true);

    switch (response.code) {
      case 200:
        this.token = response.payload.token;
        this.user = {
          email: response.payload.email,
          name: response.payload.name
        }
        return "logged";
      case 452:
        return "unknown_email";
      case 451:
      default:
        return "bad_password";
    }
  }

  async logout(): Promise<void> {
    this.token = undefined;
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
    this.snackbar.open("Vous avez été déconnecté", "", {
      duration: 2000,
    });
    this.router.navigateByUrl("/login");
  }

  async register(email: string, password: string, name: string) {
    let response = await this.post("user/register", {
      email,
      password,
      name,
    }, true);
    console.log(response)
    this.token = response.payload.token;
    this.user = {
      email: response.payload.email,
      name: response.payload.name
    }
    return response;
  }
  public async post(url: string, body: { [key: string]: string }, notLogged?: boolean): Promise<any> {
    if (!this.token && !notLogged)
      throw new Error("Not connected");

    let response = this.http.post(this.base + url, body, {
      headers: notLogged ? {} : {
        "Authorization": this.token
      }
    });

    return new Promise(executor => {
      response.toPromise().then(executor).catch((error) => executor(error.error));
    });
  }
  public async get(url: string, notLogged?: boolean): Promise<any> {
    if (!this.token && !notLogged)
      throw new Error("Not connected");

    let response = this.http.get(this.base + url, {
      headers: notLogged ? {} : {
        "Authorization": this.token
      }
    });

    return new Promise(executor => {
      response.toPromise().then(executor).catch((error) => {
        console.log(error)
        if (error.status === 403) {
          this.logout();
          console.error("Not logged anymore... Disconnecting...")
        }
        executor(error.error)
      });
    });
  }

}
