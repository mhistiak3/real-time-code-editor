import { useEffect, useRef, useState } from "react";
import User from "../components/User";
import Message from "../components/Message";
import EditorComponent from "../components/Editor";
import { initSocket } from "../socket";
import { ACTIONS } from "../../Actions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { validate } from "uuid";
import toast from "react-hot-toast";

const CodeEdit = () => {
  const socketRef = useRef(null);
  const [activeTab, setActiveTab] = useState("users");
  const [clients, setClients] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { socketId: "1", sender: "Istiak Ahammad", message: "Hello" },
    { socketId: "2", sender: "Bappi", message: "Hi" },
    { socketId: "3", sender: "Istiak Ahammad", message: "is this code right?" },
    {
      socketId: "4",
      sender: "Bappi",
      message:
        "i don't know about coding much but you can take help from cahtgpt.",
    },
  ]);
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Copy To Clip Board
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room ID Copied to Clipboard");
  };

  // handleError
  const handleError = (err) => {
    console.log(err);
    navigate("/error");
  };

  // Init Socket
  useEffect(() => {
    const isValid = validate(roomId);
    if (!isValid) {
      return navigate("/page-not-found");
    }
    if (!location.state) {
      return navigate("/page-not-found");
    }
    const init = async () => {
      try {
        socketRef.current = await initSocket();
        // Handle Error
        socketRef.current.on("connect_error", (err) => handleError(err));
        socketRef.current.on("connect_failed", (err) => handleError(err));

        // Handle Join
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location?.state?.username,
        });

        // Handel Joined User
        socketRef.current.on(
          ACTIONS.JOINED,
          ({ clients, username, socketId }) => {
            if (username !== location?.state?.username) {
              toast.success(`${username} joined the room`);
            }
            setClients(clients);
          }
        );

        // Handle Disconnected
        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.success(`${username} left the room`);
          setClients((prev) =>
            prev.filter((client) => client.socketId !== socketId)
          );
        })
      } catch (error) {
        handleError(error);
      }
    };
    init();

    return () => {
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current?.disconnect();
    }
  }, []);
  return (
    <div className="editor-page-container">
      <div className="left-sidebar">
        <div className="top-section">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <div className="room-info">
            <div className="room-code">
              <button className="copy-btn" onClick={copyToClipBoard}>
                Copy Room ID
              </button>
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
                  <Message key={message.socketId} message={message} />
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
        <EditorComponent />
      </div>
    </div>
  );
};

export default CodeEdit;
