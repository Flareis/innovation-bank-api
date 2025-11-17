const API_URL = "http://localhost:8000";

// Tipos para autenticação
export interface LoginData {
  username: string; // FastAPI OAuth2 usa 'username' mesmo sendo email
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  is_active: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

// Funções de autenticação
export async function login(data: LoginData): Promise<AuthResponse> {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to login");
  return res.json();
}

export async function register(data: RegisterData): Promise<User> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to register");
  return res.json();
}

export async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json" 
    },
  });
  if (!res.ok) throw new Error("Failed to get current user");
  return res.json();
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return token ? { "Authorization": `Bearer ${token}` } : {};
};

export async function createIdea(data: { title: string; description: string; author: string }) {
  const res = await fetch(`${API_URL}/ideas`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create idea");
  return res.json();
}

export async function voteIdea(id: string) {
  const res = await fetch(`${API_URL}/ideas/${id}/vote`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
  });
  if (!res.ok) throw new Error("Failed to vote");
  return res.json();
}