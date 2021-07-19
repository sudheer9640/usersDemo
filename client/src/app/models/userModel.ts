

export class UserModel {
  name: string;
  email: string;
  password: string;
  phoneNumber: number | null;
  role: string;
  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.phoneNumber = null;
    this.role = '';
  }
}
