const API_URL = "http://localhost:8000";

export async function fetchIdeas() {
  const res = await fetch(`${API_URL}/ideas`);
  if (!res.ok) throw new Error("Failed to fetch ideas");
  return res.json();
}

export async function fetchIdea(id: string) {
  const res = await fetch(`${API_URL}/ideas/${id}`);
  if (!res.ok) throw new Error("Failed to fetch idea");
  return res.json();
}

export async function createIdea(data: { title: string; description: string; author: string }) {
  const res = await fetch(`${API_URL}/ideas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create idea");
  return res.json();
}

export async function voteIdea(id: string) {
  const res = await fetch(`${API_URL}/ideas/${id}/vote`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to vote");
  return res.json();
}
