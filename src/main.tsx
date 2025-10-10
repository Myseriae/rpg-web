import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import CharacterSheet from "./pages/CharacterSheet";
import Spells from "./pages/Spells";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="map" element={<Map />} />
          <Route path="character-sheet" element={<CharacterSheet />} />
          <Route path="spells" element={<Spells />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);