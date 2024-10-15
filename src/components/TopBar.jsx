import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TopBar = ({ roomId }) => {
  const navigate = useNavigate();
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room ID Copied to Clipboard");
  };
  const leaveRoom = () => {
    navigate("/");
  };
  return (
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
        <button className="leave-btn" onClick={leaveRoom}>
          Leave Room
        </button>
      </div>
    </div>
  );
};
export default TopBar;
