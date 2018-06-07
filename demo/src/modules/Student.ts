import { User } from "./User";

export class Student extends User {
  public sid: string;
  constructor(id: number, name: string, sid: string) {
    super(id, name);
    this.sid = sid;
  }
}