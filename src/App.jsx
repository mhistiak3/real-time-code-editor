import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CodeEdit from "./pages/CodeEdit";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:roomId" element={<CodeEdit />} />
      </Routes>
    </>
  );
};
export default App;
