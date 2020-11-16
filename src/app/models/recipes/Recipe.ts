export class Recipe {
  constructor(
    public recipe_id: string,
    public recipe_name: string,
    public recipe_duration: number,
    public recipe_energy: number,
    public recipe_people: number,
    public created_date: Date,
  ) { }
}