import { User } from "./User";

export type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    user: User | null;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
  }

export interface LoginRequest {
    email: string;
    password: string;
}

export type AuthResponse = {
    token: string;   
    user: User;
    message: string;   
};