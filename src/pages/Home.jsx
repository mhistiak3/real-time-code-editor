// Home.js
import { useState } from "react";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  // Function to generate a random room ID
  const generateRoomId = () => {    
    const generatedId = Math.random().toString(36).substr(2, 10); // Random 9-character string
    
    setRoomId(generatedId);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomId || !username) {
      alert("Please enter a Room ID and Username");
      return;
    }
    // Logic to join the room (could redirect or make API call)
    console.log("Joining room:", roomId, "as", username);
  };

  return (
    <div className="join-room-wrapper">
      <div className="join-room-container">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>

        <form className="join-room-form" onSubmit={handleSubmit}>
          <h2>Join a Code Room</h2>

          <div className="form-group">
            <label htmlFor="room-id">New Room ID or Past Invitation Room ID</label>
            <div className="room-id-group">
              <input
                type="text"
                id="room-id"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter or Generate Room ID"
                required
              />
              <button
                type="button"
                className="generate-room-btn"
                onClick={generateRoomId}
              >
                CreateRoom
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              required
            />
          </div>

          <button type="submit" className="join-btn">
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
