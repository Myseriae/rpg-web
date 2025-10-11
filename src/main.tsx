import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import CharacterSheet from "./pages/CharacterSheet";
import Spells from "./pages/Spells";
import SkillTree from "./pages/SkillTree";
import type {Character} from "./features/charactersheet/datastructures/character";
import type {Item} from "./features/charactersheet/datastructures/item";
import {Heart} from "lucide-react";


const exampleItem: Item = {
  icon: Heart,
  id: "1",
  name: "Health Potion",
  description: "Restores 20 HP",
  type: "consumable",
  value: 50,
  weight: 0.5
};

const exampleItem2: Item = {
  icon: Heart,
  id: "1",
  name: "Health Potion",
  description: "Restores 20 HP",
  type: "consumable",
  value: 50,
  weight: 0.5
};

const exampleItem3: Item = {
  icon: Heart,
  id: "1",
  name: "Health Potion",
  description: "Restores 20 HP",
  type: "consumable",
  value: 50,
  weight: 0.5
};


const exampleItem4: Item = {
  icon: Heart,
  id: "1",
  name: "Health Potion",
  description: "Restores 20 HP",
  type: "consumable",
  value: 50,
  weight: 0.5
};


const exampleItem5: Item = {
  icon: Heart,
  id: "1",
  name: "Health Potion",
  description: "Restores 20 HP",
  type: "consumable",
  value: 50,
  weight: 0.5
};

const exampleCharacter: Character = {
  strength: 15,
  dexterity: 14,
  constitution: 13,
  intelligence: 12,
  wisdom: 10,
  charisma: 8,
  inventory: {capacity: 20, size: 5, items: [exampleItem, exampleItem2, exampleItem3, exampleItem4, exampleItem5] },
  equipment: {
    head: exampleItem,
    body: exampleItem2,
    legs: exampleItem3,
    feet: exampleItem4,
    hands: exampleItem5,
    weaponMainHand: exampleItem,
    weaponOffHand: exampleItem2
  }
};


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="map" element={<Map />} />
          <Route path="character-sheet" element={<CharacterSheet {...exampleCharacter} />} />
          <Route path="spells" element={<Spells />} />
          <Route path="skill-tree" element={<SkillTree />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);