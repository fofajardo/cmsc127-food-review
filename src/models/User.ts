export class User {
  user_id: string;
  name: string;
  username: string;
  email: string;
  constructor(user_id: string, name: string, username: string, email: string) {
    this.user_id = user_id;
    this.name = name;
    this.username = username;
    this.email = email;
  }
}

export const sampleUser = new User(
  "1",
  "Sample Name",
  "sample_username",
  "sample_email"
);
