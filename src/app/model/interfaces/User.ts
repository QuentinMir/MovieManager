export interface User {
  _id: number;
  username: string;
  /*  userIdentifier: string;*/
  roles: string[];
  password: string;
}
