import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeForm from "./pages/HomeForm";
import Table from "./pages/UserTable";
import { UserDataProvider } from "./context/UserDataProvider";

function App() {
  return (
    <UserDataProvider>
      <Router>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
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
