export interface RegisterDto {
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
}
