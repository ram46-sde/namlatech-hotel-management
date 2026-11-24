import { Routes, Route, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HotelListPage from "./pages/HotelListPage";
import HotelFormPage from "./pages/HotelFormPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import "./App.css";
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Hotel Listing */}
        <Route path="/" element={<HotelListPage />} />

        {/* Add Hotel */}
        <Route path="/hotels/new" element={<HotelFormPage />} />

        {/* Edit Hotel */}
        <Route path="/hotels/:id/edit" element={<HotelFormPage />} />

        {/* Hotel Details */}
        <Route path="/hotels/:id" element={<HotelDetailsPage />} />

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
