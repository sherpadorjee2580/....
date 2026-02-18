import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wish from "./pages/Wish"; // We will create this next
import GiftPage from "./pages/GiftPage"; // We will create this after

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wish />} />
        <Route path="/gift" element={<GiftPage />} />
      </Routes>
    </Router>
  );
}
