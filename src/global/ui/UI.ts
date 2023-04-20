export default class UI {
  private static instance: UI;
  private constructor() {}

  public static set() {
    if (this.instance == null) {
      this.instance = new UI();
    }
  }

  public static get get() {
    return this.instance;
  }
}
