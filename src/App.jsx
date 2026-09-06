import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "../src/pages/context/AuthContext";

import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
