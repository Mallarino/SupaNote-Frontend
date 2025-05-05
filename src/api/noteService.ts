import axios from "axios";
import { Note } from "../types/Note";
import { getToken } from "../utils/auth";


const API_URL = 'http://localhost:8080/api/notes';


export const getNotes = async (): Promise<Note[]> => {
  const token = getToken();
  const response = await axios.get<Note[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
};

  
  export const createNote = async (
    note: Omit<Note, "id" | "createdAt" | "updatedAt">
  ): Promise<Note> => {
    const token = getToken();
    const response = await axios.post(API_URL, note, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  };
  
  export const updateNote = async (id: number, note: Partial<Note>): Promise<Note> => {
    const token = getToken();
    const response = await axios.put<Note>(`${API_URL}/${id}`, note, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  };
  
  export const deleteNote = async (id: number): Promise<void> => {  
    const token = getToken();
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };