import React, { useState, useEffect, useRef } from "react";
import "./Messagerie.css";
import {
  fetchMessages,
  sendMessage,
  deleteConversation,
} from "../api/messagesApi";

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
    fetchMessages()
      .then((data) => setMessages(data))
      .catch((err) => console.error("Erreur chargement messages:", err));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.receiver || !newMessage.content.trim()) return;

    try {
      const saved = await sendMessage({
        sender: "Moi",
        receiver: newMessage.receiver,
        content: newMessage.content,
      });

    const messageWithDate = {
      ...saved,
      date: saved.date || new Date().toLocaleString(),
    };

     setMessages([...messages, messageWithDate]);
    setNewMessage({ sender: "Moi", receiver: newMessage.receiver, content: "" });
    setShowNewChat(false);
    if (!selectedUser) setSelectedUser(newMessage.receiver);
  } catch (err) {
    console.error("Erreur envoi message:", err);
  }
};

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setNewMessage({ ...newMessage, receiver: user });
    setShowNewChat(false);

    // affichage mobile
    if (window.innerWidth <= 700) {
      document.querySelector(".messagerie-container").classList.add("show-chat");
    }
  };

  const handleBackClick = () => {
    setSelectedUser(null);
    document.querySelector(".messagerie-container").classList.remove("show-chat");
  };

  const handleDeleteConversation = async (user) => {
    try {
      await deleteConversation(user);
      setMessages(messages.filter((m) => !(m.sender === user || m.receiver === user)));
      if (selectedUser === user) handleBackClick();
      setOpenMenu(null);
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };  return (
    <div className="messagerie-container">
      {/* Liste discussions */}
      <div className="sidebar">
        <h3>Discussions</h3>
        <ul>
          {users.map((user) => (
            <li key={user} className={user === selectedUser ? "active" : ""}>
              <span className="user-name" onClick={() => handleUserClick(user)}>
                {user}
              </span>

              <div className="menu-wrapper" onClick={(e) => e.stopPropagation()}>
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
                        if (selectedUser === user) handleBackClick();
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

            // affichage mobile
            if (window.innerWidth <= 700) {
              document
                .querySelector(".messagerie-container")
                .classList.add("show-chat");
            }
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
                onClick={() => {
                  setShowNewChat(false);
                  if (window.innerWidth <= 700) {
                    document
                      .querySelector(".messagerie-container")
                      .classList.remove("show-chat");
                  }
                }}
              >
                Annuler
              </button>
              <button type="submit">Envoyer</button>
            </div>
          </form>
        ) : selectedUser ? (
          <>
            <div className="chat-header">
              <span className="back-btn" onClick={handleBackClick}>
                ←
              </span>
              <h2>Conversation avec {selectedUser}</h2>
            </div>

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

