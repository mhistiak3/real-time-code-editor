import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CodeEdit from "./pages/CodeEdit";
import SocketErrorPage from "./pages/Error";
import NotFoundPage from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:roomId" element={<CodeEdit />} />
        <Route path="/error" element={<SocketErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default App;
