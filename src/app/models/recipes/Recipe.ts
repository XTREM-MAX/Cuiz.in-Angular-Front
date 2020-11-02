export class Recipe {
  constructor(
    public name: string,
    public imageUrl: string,
    public time: number,
    public users: number,
    public dateLiked: string,
    public hourLiked: string,
  ) { }
}