import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate()

  const generateRoomId = () => {
    const generatedId = uuidv4();
    setRoomId(generatedId);
    toast.success("Room ID Created");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomId || !username) {
      alert("Please enter a Room ID and Username");
      return;
    }
    // Join Room

    navigate(`/edit/${roomId}`,{
      state: { username },
    })

  };

  return (
    <div className="home-container">
      <div className="join-room-wrapper">
        <div className="join-room-container">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
          </div>

          <form className="join-room-form" onSubmit={handleSubmit}>
            <h2>Join a Code Room</h2>

            <div className="form-group">
              <label htmlFor="room-id">
                New Room ID or Past Invitation Room ID
              </label>
              <div className="room-id-group">
                <input
                  type="text"
                  id="room-id"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Generate or Past Room ID"
                  required
                />
                <button
                  type="button"
                  className="generate-room-btn"
                  onClick={generateRoomId}
                >
                  CreateID
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
    </div>
  );
};

export default Home;
