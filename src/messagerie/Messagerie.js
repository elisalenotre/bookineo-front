import React, { useEffect, useRef, useState } from "react";
import "./Messagerie.css";
import {
  getConversations,
  getConversationWith,
  sendMessage,
  getUnreadCount,
} from "../api/messages";

export default function Messagerie() {
  const [convos, setConvos] = useState([]);          
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState([]); 
  const [unreadCount, setUnreadCount] = useState(0);
  const [newMsg, setNewMsg] = useState({ to: "", content: "" });
  const [showNewChat, setShowNewChat] = useState(false);
  const chatEndRef = useRef(null);

  async function refreshLeft() {
    const [c, u] = await Promise.all([getConversations(), getUnreadCount()]);
    setConvos(c.data || []);
    setUnreadCount(u.unread || 0);
  }

  async function openConversation(userEmail) {
    setSelectedUser(userEmail);
    setShowNewChat(false);
    const res = await getConversationWith(userEmail);
    setConversation(res.data || []);
    if (window.innerWidth <= 700) {
      document.querySelector(".messagerie-container")?.classList.add("show-chat");
    }
    refreshLeft();
  }

  useEffect(() => { refreshLeft(); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); },
    [conversation, selectedUser]);

  useEffect(() => {
    const id = setInterval(refreshLeft, 10000);
    return () => clearInterval(id);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const to = showNewChat ? newMsg.to : selectedUser;
    if (!to || !newMsg.content.trim()) return;
    await sendMessage(to, newMsg.content.trim());
    setNewMsg({ to: showNewChat ? "" : to, content: "" });
    await openConversation(to);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
    document.querySelector(".messagerie-container")?.classList.remove("show-chat");
  };

  return (
    <div className="messagerie-container">
      <div className="sidebar">
        <h3>Discussions {unreadCount > 0 ? `(${unreadCount})` : ""}</h3>
        <ul>
          {convos.map(c => (
            <li key={c.with} className={c.with === selectedUser ? "active" : ""}>
              <span className="user-name" onClick={() => openConversation(c.with)}>
                {c.with}
              </span>
              <span className={`preview ${c.is_read ? "read" : "unread"}`}>{c.last_preview}</span>
            </li>
          ))}
          {convos.length === 0 && <li style={{opacity:.6}}>Aucune conversation</li>}
        </ul>

        <button
          className="new-chat-btn"
          onClick={() => {
            setShowNewChat(true);
            setSelectedUser(null);
            setNewMsg({ to: "", content: "" });
            if (window.innerWidth <= 700) {
              document.querySelector(".messagerie-container")?.classList.add("show-chat");
            }
          }}
        >
          + Nouvelle discussion
        </button>
      </div>

      <div className="chat-page">
        {showNewChat ? (
          <form className="chat-form new-chat-form" onSubmit={handleSend}>
            <h2>Nouvelle discussion</h2>
            <input
              type="email"
              placeholder="email du destinataire"
              value={newMsg.to}
              onChange={(e) => setNewMsg({ ...newMsg, to: e.target.value })}
              required
            />
            <textarea
              rows="2"
              placeholder="Votre message..."
              value={newMsg.content}
              onChange={(e) => setNewMsg({ ...newMsg, content: e.target.value })}
              required
            />
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowNewChat(false);
                  document.querySelector(".messagerie-container")?.classList.remove("show-chat");
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
              <span className="back-btn" onClick={handleBackClick}>←</span>
              <h2>Conversation avec {selectedUser}</h2>
            </div>

            <div className="chat-box">
              {conversation.map(msg => {
                const me = msg.from !== selectedUser; 
                return (
                  <div key={msg.id} className={`chat-message ${me ? "sent" : "received"}`}>
                    <div className="bubble">
                      <span className="author">{msg.from}</span>
                      <p>{msg.content}</p>
                      <span className="meta">{new Date(msg.date).toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            <form className="chat-form" onSubmit={handleSend}>
              <textarea
                rows="2"
                placeholder="Votre message..."
                value={newMsg.content}
                onChange={(e) => setNewMsg({ ...newMsg, content: e.target.value })}
                required
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