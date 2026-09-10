import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "../src/pages/context/AuthContext";

import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
