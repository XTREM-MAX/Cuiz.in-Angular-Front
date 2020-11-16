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

  get connected(): boolean {
    return !!this.token;
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

  async login(email: string, password: string) {
    let { token, mail, name } = await this.post("user/connexion", {
      email,
      password,
    }, true);
    this.token = token;
    this.user = {
      email: mail,
      name
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
    if (!this.token)
      throw new Error("Not connected");
    
    let response: any = await this.http.get(this.base + url, {
      headers: notLogged ? { } : {
        "Authorization": this.token
      }
    }).toPromise();
    return response;
  }
  public async post(url: string, body: { [key: string]: string }, notLogged?: boolean): Promise<any> {
    if (!this.token)
      throw new Error("Not connected");
    
    let response: any = await this.http.post(this.base+url, body, {
      headers: notLogged ? { } : {
        "Authorization": this.token
      }
    }).toPromise();
    return response;
  }

}
