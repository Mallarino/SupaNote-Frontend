import axios from "axios";
import { Note } from "../types/Note";
import { ApiResponse } from "../types/ApiResponse";


const API_URL = 'http://localhost:8080/api/notes';

export const getNotes = async (): Promise<Note[]> => {
    const response = await axios.get<Note[]>(API_URL);
    return response.data;
}

export const getNoteById = async (id: number): Promise<Note> => {
    const response = await axios.get<Note>(`${API_URL}/${id}`);
    return response.data;
  };
  
  export const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
    const response = await axios.post<Note>(API_URL, note);
    return response.data;
  };
  
  export const updateNote = async (id: number, note: Partial<Note>): Promise<Note> => {
    const response = await axios.put<Note>(`${API_URL}/${id}`, note);
    return response.data;
  };
  
  export const deleteNote = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  };