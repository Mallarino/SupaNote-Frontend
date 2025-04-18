import axios from "axios";
import { LoginRequest, AuthResponse, RegisterRequest } from "../types/Auth";

const API_URL = "http://localhost:8080/auth";

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/register`, data);
  return response.data;
};