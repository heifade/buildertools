import { Person } from "./Person";

export class User extends Person {
  public name: string;
  constructor(id: number, name: string) {
    super(id);
    this.name = name;
  }
}
