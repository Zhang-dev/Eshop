export default class User {
  constructor(firstname, name, email, password) {
    this.name = name;
    this.firstname = firstname;
    this.email = email;
    this.password = password;
    this.cart = [];
  }
}
