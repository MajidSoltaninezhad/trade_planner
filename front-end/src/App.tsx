import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeForm from "./pages/HomeForm";
import Table from "./pages/UserTable";
import { UserDataProvider } from "./context/UserDataProvider";

function App() {
  return (
    <UserDataProvider>
      <Router>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-6">
          <Routes>
            <Route path="/" element={<HomeForm />} />
            <Route path="/table" element={<Table />} />
          </Routes>
        </div>
      </Router>
    </UserDataProvider>
  );
}

export default App;
