export class BottomBarButton {
  public focused: boolean;
  constructor(
    public name: string,
    public icon: string,
    defaultFocus: boolean = false
  ) {
    this.focused = defaultFocus;
  };
}