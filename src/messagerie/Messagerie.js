import React, { useState, useEffect, useRef } from "react";
import "./Messagerie.css";

function Messagerie() {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState({
    sender: "Moi",
    receiver: "",
    content: "",
  });
  const [showNewChat, setShowNewChat] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    // simulation données
    const fakeMessages = [
      {
        id: 1,
        sender: "Alice",
        receiver: "Moi",
        date: "2025-09-18 10:15",
        content: "Bonjour, j’aimerais réserver un livre.",
      },
      {
        id: 2,
        sender: "Moi",
        receiver: "Alice",
        date: "2025-09-18 10:17",
        content: "Salut Alice, aucun problème 🙂 Quel livre veux-tu ?",
      },
      {
        id: 3,
        sender: "Bob",
        receiver: "Moi",
        date: "2025-09-18 11:00",
        content: "Est-ce que vous avez des mangas disponibles ?",
      },
    ];
    setMessages(fakeMessages);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  // ferme le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const users = Array.from(
    new Set(messages.map((m) => (m.sender === "Moi" ? m.receiver : m.sender)))
  );

  const conversation = messages.filter(
    (m) => m.sender === selectedUser || m.receiver === selectedUser
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.receiver || !newMessage.content.trim()) return;

    const message = {
      id: Date.now(),
      sender: newMessage.sender,
      receiver: newMessage.receiver,
      date: new Date().toLocaleString(),
      content: newMessage.content,
    };

    setMessages([...messages, message]);
    setNewMessage({ sender: "Moi", receiver: newMessage.receiver, content: "" });
    setShowNewChat(false);
    if (!selectedUser) setSelectedUser(newMessage.receiver);
  };

  return (
    <div className="messagerie-container">
      {/* Liste discussions */}
      <div className="sidebar">
        <h3>Discussions</h3>
        <ul>
          {users.map((user) => (
            <li
              key={user}
              className={user === selectedUser ? "active" : ""}
            >
              <span
                className="user-name"
                onClick={() => {
                  setSelectedUser(user);
                  setNewMessage({ ...newMessage, receiver: user });
                  setShowNewChat(false);
                }}
              >
                {user}
              </span>

              <div
                className="menu-wrapper"
                onClick={(e) => e.stopPropagation()} 
              >
                <button
                  className="menu-btn"
                  onClick={() => setOpenMenu(openMenu === user ? null : user)}
                >
                  ⋮
                </button>

                {openMenu === user && (
                  <div className="submenu">
                    <button
                      onClick={() => {
                        setMessages(
                          messages.filter(
                            (m) => !(m.sender === user || m.receiver === user)
                          )
                        );
                        if (selectedUser === user) setSelectedUser(null);
                        setOpenMenu(null);
                      }}
                    >
                      Supprimer la discussion
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        <button
          className="new-chat-btn"
          onClick={() => {
            setShowNewChat(true);
            setSelectedUser(null);
            setNewMessage({ sender: "Moi", receiver: "", content: "" });
          }}
        >
          + Nouvelle discussion
        </button>
      </div>

      {/* chat */}
      <div className="chat-page">
        {showNewChat ? (
          <form className="chat-form new-chat-form" onSubmit={handleSend}>
            <h2>Nouvelle discussion</h2>
            <input
              type="text"
              placeholder="Nom du destinataire"
              value={newMessage.receiver}
              onChange={(e) =>
                setNewMessage({ ...newMessage, receiver: e.target.value })
              }
            />
            <textarea
              rows="2"
              placeholder="Votre message..."
              value={newMessage.content}
              onChange={(e) =>
                setNewMessage({ ...newMessage, content: e.target.value })
              }
            />
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowNewChat(false)}
              >
                Annuler
              </button>
              <button type="submit">Envoyer</button>
            </div>
          </form>
        ) : selectedUser ? (
          <>
            <h2>Conversation avec {selectedUser}</h2>
            <div className="chat-box">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-message ${
                    msg.sender === "Moi" ? "sent" : "received"
                  }`}
                >
                  <div className="bubble">
                    <span className="author">{msg.sender}</span>
                    <p>{msg.content}</p>
                    <span className="meta">{msg.date}</span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form className="chat-form" onSubmit={handleSend}>
              <textarea
                rows="2"
                placeholder="Votre message..."
                value={newMessage.content}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, content: e.target.value })
                }
              />
              <button type="submit">Envoyer</button>
            </form>
          </>
        ) : (
          <div className="no-chat">Sélectionnez une discussion</div>
        )}
      </div>
    </div>
  );
}

export default Messagerie;
