const API_URL = "http://localhost:1234/v1/chat/completions";

export async function sendMessage(messages) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen2-1.5b-instruct", //Changez ici le nom de votre LLM
      api_key:"lm-studio",
      messages: [
        {
          role: "system",
          content: "Réponds à Comment louer un livre ? ou Comment emprunter un livre ? ou aux questions similaires par : Pour louer un livre il faut cliquer sur le bouton emprunter. Réponds à Comment modifier mon profil ? ou aux questions similaires par : Pour modifier votre profil il faut cliquer sur l\’avatar en haut à droite de la navigation puis cliquer sur profil. Ensuite vous pourrez modifier vos informations et les valider. Réponds à Comment savoir si un livre est disponible ?  ou aux questions similaires par : 'Un livre est disponible quand son bouton emprunter est actif. Autrement il sera grisé et impossible à cliquer. Vous pouvez également filtrer les livres par statut via la barre de filtres et choisir de n’afficher que les livres disponibles.' Réponds à toutes les autre requêtes par : Désolé je n\’ai pas de réponse à cette question. Je peux vous renseigner sur comment louer un livre, comment modifier votre profil ou bien comment savoir si un livre est disponible.",
        },
      ],
      temperature: 0.2, 
      max_tokens: 300,
      

}),
});

  if (!res.ok) {
    throw new Error("Erreur API LM Studio: " + res.statusText);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}