export interface Quantity {
  portion: string;
  total: number;
}

export interface Seasoning {
  quantity: string;
  ingredient: string;
}

export interface Quantity {
  quantity: number;
  quantity_type: string;
  quantity_type_custom?: any;
  quantity_total_g?: any;
}

export interface Information {
  _id: string;
  name: string;
  source: number;
  picture: string;
}

export interface Ingredients {
  tagsId: string[];
  quantities: { [key: number]: Quantity };
  information: Information[];
}

export interface Time {
  total: number;
  preparation: number;
  baking: number;
}

export interface Tags {
  additives: string[];
  diets: any[];
}

export interface Step {
  content: string;
  ingredients: string[];
}

export interface Nutriments {
  salt: number;
  sugar: number;
  proteins: number;
  carbohydrates: number;
  fat: number;
  saturatedFat: number;
  energy: number;
  fiber: number;
}

export interface Owner {
  username: string;
}

export interface Recipe {
  name: string;
  nameSlugify: string;
  quantity: Quantity;
  picture: boolean;
  category: number;
  isActive: boolean;
  avgRate?: any;
  seasoning: Seasoning[];
  ingredients: Ingredients;
  numberOfIngredients: number;
  time: Time;
  nutriscore: number;
  tags: Tags;
  difficulty: number;
  steps: Step[];
  nutriments: Nutriments;
  owner: Owner[];
  numberOfComments: number;
}

export interface Quantity2 {
  portion: string;
  total: number;
}

export interface Time2 {
  total: number;
  preparation: number;
  baking: number;
}

export interface LastRecipe {
  name: string;
  nameSlugify: string;
  quantity: Quantity2;
  picture: boolean;
  category: number;
  avgRate?: any;
  numberOfIngredients: number;
  time: Time2;
  nutriscore: number;
  difficulty: number;
  numberOfComments: number;
}

export interface Quantity3 {
  portion: any;
  total: number;
}

export interface Time3 {
  total: number;
  preparation: number;
  baking: number;
}

export interface Suggestion {
  name: string;
  nameSlugify: string;
  quantity: Quantity3;
  picture: boolean;
  category: number;
  avgRate?: any;
  numberOfIngredients: number;
  time: Time3;
  nutriscore: number;
  difficulty: number;
  numberOfComments: number;
}

export interface RecipeDetails {
  recipe: Recipe;
  lastRecipes: LastRecipe[];
  suggestions: Suggestion[];
}

export interface RootObject {
  status: string;
  statusCode: number;
  response: Response;
}