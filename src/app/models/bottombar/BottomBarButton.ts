export class BottomBarButton {
  public focused: boolean;
  constructor(
    public name: string,
    public icon: string,
    public route: string,
    defaultFocus: boolean = false
  ) {
    this.focused = defaultFocus;
  };
  updateRoute(newRoute: string) {
    this.focused = this.route === newRoute;
  }
}