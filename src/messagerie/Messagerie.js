// import React, { useState, useEffect } from "react";
// import "./Messagerie.css";

// function Messagerie() {
//   const [messages, setMessages] = useState([]);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     // Simule des données à remplacer apr fetch API Symfony
//     const fakeMessages = [
//       {
//         id: 1,
//         sender: "Alice",
//         date: "2025-09-18",
//         preview: "Bonjour, j’aimerais réserver un livre...",
//         content: "Bonjour, j’aimerais réserver un livre pour la semaine prochaine.",
//         isRead: false,
//       },
//       {
//         id: 2,
//         sender: "Bob",
//         date: "2025-09-17",
//         preview: "Merci pour votre aide !",
//         content: "Merci pour votre aide ! Le site fonctionne super bien.",
//         isRead: true,
//       },
//     ];
//     setMessages(fakeMessages);
//   }, []);

//   const openMessage = (msg) => {
//     setSelected(msg);
//     setMessages((prev) =>
//       prev.map((m) =>
//         m.id === msg.id ? { ...m, isRead: true } : m
//       )
//     );
//   };

//   const unreadCount = messages.filter((m) => !m.isRead).length;

//   return (
//     <div className="message-page">
//       <h2>Messagerie ({unreadCount} non lus)</h2>

//       <table className="message-table">
//         <thead>
//           <tr>
//             <th>Expéditeur</th>
//             <th>Date</th>
//             <th>Aperçu</th>
//           </tr>
//         </thead>
//         <tbody>
//           {messages.map((msg) => (
//             <tr
//               key={msg.id}
//               onClick={() => openMessage(msg)}
//               className={msg.isRead ? "read" : "unread"}
//             >
//               <td>{msg.sender}</td>
//               <td>{msg.date}</td>
//               <td>{msg.preview}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selected && (
//         <div className="message-detail">
//           <h3>{selected.sender}</h3>
//           <p className="date">{selected.date}</p>
//           <p>{selected.content}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Messagerie;


import React, { useState, useEffect } from "react";
import "./Messagerie.css";

function Messagerie() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newMessage, setNewMessage] = useState({
    sender: "Moi",
    receiver: "",
    content: "",
  });

  useEffect(() => {
    // 👉 Simule des données (remplacera avec API Symfony plus tard)
    const fakeMessages = [
      {
        id: 1,
        sender: "Alice",
        receiver: "Moi",
        date: "2025-09-18",
        preview: "Bonjour, j’aimerais réserver un livre...",
        content: "Bonjour, j’aimerais réserver un livre pour la semaine prochaine.",
        isRead: false,
      },
      {
        id: 2,
        sender: "Moi",
        receiver: "Bob",
        date: "2025-09-17",
        preview: "Merci pour votre aide !",
        content: "Merci pour votre aide ! Le site fonctionne super bien.",
        isRead: true,
      },
    ];
    setMessages(fakeMessages);
  }, []);

  const openMessage = (msg) => {
    setSelected(msg);
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msg.id ? { ...m, isRead: true } : m
      )
    );
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.receiver || !newMessage.content.trim()) return;

    const message = {
      id: Date.now(),
      sender: newMessage.sender,
      receiver: newMessage.receiver,
      date: new Date().toISOString().split("T")[0],
      preview:
        newMessage.content.length > 40
          ? newMessage.content.slice(0, 40) + "..."
          : newMessage.content,
      content: newMessage.content,
      isRead: true,
    };

    setMessages([message, ...messages]); // ajoute en haut
    setNewMessage({ sender: "Moi", receiver: "", content: "" });
  };

  return (
    <div className="message-page">
      <h2>Messagerie ({unreadCount} non lus)</h2>

      <table className="message-table">
        <thead>
          <tr>
            <th>Expéditeur</th>
            <th>Destinataire</th>
            <th>Date</th>
            <th>Aperçu</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr
              key={msg.id}
              onClick={() => openMessage(msg)}
              className={msg.isRead ? "read" : "unread"}
            >
              <td>{msg.sender}</td>
              <td>{msg.receiver}</td>
              <td>{msg.date}</td>
              <td>{msg.preview}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="message-detail">
          <h3>
            {selected.sender} ➝ {selected.receiver}
          </h3>
          <p className="date">{selected.date}</p>
          <p>{selected.content}</p>
        </div>
      )}

      {/* Formulaire d’envoi */}
      <form className="message-form" onSubmit={handleSend}>
        <h3>Envoyer un message</h3>
        <input
          type="text"
          placeholder="Destinataire"
          value={newMessage.receiver}
          onChange={(e) =>
            setNewMessage({ ...newMessage, receiver: e.target.value })
          }
        />
        <textarea
          rows="4"
          placeholder="Votre message..."
          value={newMessage.content}
          onChange={(e) =>
            setNewMessage({ ...newMessage, content: e.target.value })
          }
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Messagerie;
