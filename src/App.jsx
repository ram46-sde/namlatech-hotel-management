import { Routes, Route, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import HotelListPage from "./pages/HotelListPage";
import HotelFormPage from "./pages/HotelFormPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";

import "./App.css";

function App() {
  return (
    <div className="site-layout">
      <Navbar />

      <div className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/hotels" element={<HotelListPage />} />

          <Route path="/hotels/new" element={<HotelFormPage />} />

          <Route path="/hotels/:id/edit" element={<HotelFormPage />} />

          <Route path="/hotels/:id" element={<HotelDetailsPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
