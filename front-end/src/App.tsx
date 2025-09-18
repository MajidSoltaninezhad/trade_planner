import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeForm from "./pages/HomeForm";
import Table from "./pages/UserTable";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-6">
        <Routes>
          <Route path="/" element={<HomeForm />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
