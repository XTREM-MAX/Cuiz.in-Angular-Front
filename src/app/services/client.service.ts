import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipes/Recipe';
import RecipeResponse from './models/RecipeResponse';
import UserData from './models/UserData';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  recipes: Recipe[] = [];
  base = "https://api.cuiz.in/";

  user: UserData;
  
  get token(): string {
    return window.localStorage.token;
  }
  set token(token: string) {
    window.localStorage.token = token;
  }

  get logged(): boolean {
    return !!this.token?.length;
  }

  constructor(public http: HttpClient) { }

  async init() {
    if (this.token) {
      this.recipes = await this.get("recipe/all");
      this.user = await this.get("user/get");
    }
  }

  async likeRecipe(recipe_id: string) {
    let added: Recipe = await this.post("recipe/add", {
      recipe_id
    });
    this.recipes.push(added);
  }
  async dislikeRecipe(recipe_id: string) {
    let added: Recipe = await this.get(`/recipe/${recipe_id}/remove`);
    this.recipes.push(added);
  }

  async random(): Promise<RecipeResponse> {
    return (await this.get("recipe/random")).recipe;
  }

  async getRecipe(recipe_id: string): Promise<RecipeResponse> {
    return (await this.get(`recipe/${recipe_id}/details`));
  }

  async login(email: string, password: string): Promise<"logged" | "bad_password" | "unknown_email"> {
    let response = await this.post("user/connexion", {
      email,
      password,
    }, true);

    switch (response.code) {
      case 200:
        this.token = response.token;
        this.user = {
          email: response.email,
          name: response.name
        }
        return "logged";
      case 452:
        return "unknown_email";
      case 451:
      default:
        return "bad_password";
    }
  }

  async register(email: string, password: string, name: string) {
    await this.post("user/register", {
      email,
      password,
      name,
    }, true);
  }

  public async get(url: string, notLogged?: boolean): Promise<any> {
    if (!this.token && !notLogged)
      throw new Error("Not connected");
    
    let response: any = await this.http.get(this.base + url, {
      headers: notLogged ? { } : {
        "Authorization": this.token
      }
    }).toPromise();
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

}
