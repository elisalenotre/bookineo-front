const API_URL = "http://localhost:8001/api/messages";

export async function fetchMessages() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur de chargement des messages");
  return res.json();
}

export async function sendMessage(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur d'envoi du message");
  return res.json();
}

export async function deleteConversation(user) {
  const res = await fetch(`${API_URL}/delete-conversation/${user}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erreur de suppression de la conversation");
  return true;
}
