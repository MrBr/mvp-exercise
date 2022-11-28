export interface User {
  username: string;
  deposit: number;
  role: "buyer" | "seller";
  id: number;
  password?: string;
}
