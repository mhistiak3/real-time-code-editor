
import { Link } from "react-router-dom";


const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
