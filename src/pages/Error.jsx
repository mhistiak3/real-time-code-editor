
import { useNavigate } from "react-router-dom";

const SocketErrorPage = ({
  errorMessage = "There was an issue connecting to the server.",
}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate("/");
    };
  return (
    <div className="socket-error-page">
      <h1>Connection Error</h1>
      <p>{errorMessage || "There was an issue connecting to the server."}</p>
      <button onClick={handleGoBack}>Try Again</button>
    </div>
  );
};

export default SocketErrorPage;
