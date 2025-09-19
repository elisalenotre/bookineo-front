import React, { useState } from "react";
import { sendMessage } from "../api/chatApi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(newMessages);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  const [style, setStyle] = useState("chatbox closed");

  const changeStyle = () => {
      if (style !== "chatbox closed") setStyle("chatbox closed");
      else setStyle("chatbox open");
      
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter'){
      handleSend()
    }
  }

  return (

    <div className={style}>
      <button className="btn btn-close"      
        onClick={changeStyle}>
        <IoChatboxEllipsesOutline className="chat-icon" />
        <IoMdClose className="close-icon" />
      </button>
      <div className="chat-messages">
        {messages
          .filter((m) => m.role !== "system")
          .map((msg, idx) => (
            <div key={idx} className={`msg ${msg.role}`}>
              <strong>{msg.role === "user" ? "Vous" : "IA"}:</strong> {msg.content}
            </div>
          ))}
        {loading && <div className="msg assistant">...</div>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          className="input"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Poser une question..."
          onKeyDown={handleEnter}
        />
        <button className="btn btn-chatbox" onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
}
