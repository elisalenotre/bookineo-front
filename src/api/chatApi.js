const API_URL = "http://localhost:1234/v1/chat/completions";

export async function sendMessage(messages) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "smallthinker-3b-preview", 
      messages: messages,
    }),
  });

  if (!res.ok) throw new Error("Erreur API LM Studio");
  const data = await res.json();
  return data.choices[0].message.content;
}
