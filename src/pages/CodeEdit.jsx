import { useState } from "react";
import User from "../components/User";
import Message from "../components/Message";

const CodeEdit = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [clients, setClients] = useState([
    {
      socketId: "1",
      username: "Istiak Ahammad",
    },
    {
      socketId: "2",
      username: "Hossain Ahammad",
    },
  ]);
  const [chatMessages, setChatMessages] = useState([
    { socketId: "1", sender: "Istiak Ahammad", message: "Hello" },
    { socketId: "1", sender: "Bappi", message: "Hi" },
    { socketId: "1", sender: "Istiak Ahammad", message: "is this code right?" },
    {
      socketId: "1",
      sender: "Bappi",
      message:
        "i don't know about coding much but you can take help from cahtgpt.",
    },
  ]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="editor-page-container">
      <div className="left-sidebar">
        <div className="top-section">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <div className="room-info">
            <div className="room-code">
              <button className="copy-btn">Copy Room ID</button>
            </div>
            <button className="leave-btn">Leave Room</button>
          </div>
        </div>
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => handleTabClick("users")}
          >
            Users
          </button>
          <button
            className={`tab-btn ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => handleTabClick("chat")}
          >
            Group Chat
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "users" ? (
            <div className="users-tab">
              <h3>Joined Users</h3>

              <ul>
                {clients.map((client) => (
                  <User username={client.username} key={client.socketId} />
                ))}
              </ul>
            </div>
          ) : (
            <div className="chat-tab">
              <h3>Group Chat</h3>
              <div className="chat-messages">
                {chatMessages.map((message) => (
                  <Message message={message} />
                ))}
              </div>
              <input
                type="text"
                placeholder="Type a message..."
                className="chat-input"
              />
            </div>
          )}
        </div>
      </div>

      <div className="right-editor">
        <textarea
          className="code-editor"
          placeholder="Write your code here..."
        ></textarea>
      </div>
    </div>
  );
};

export default CodeEdit;
