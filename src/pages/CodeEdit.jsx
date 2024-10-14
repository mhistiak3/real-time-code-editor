import { useState } from "react";

const CodeEdit = () => {
  const [activeTab, setActiveTab] = useState("users");

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
                <li>User 1</li>
                <li>User 2</li>
              </ul>
            </div>
          ) : (
            <div className="chat-tab">
              <h3>Group Chat</h3>
              <div className="chat-messages">
                <p>User 1: Hello!</p>
                <p>User 2: Hi there!</p>
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
