import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <header className="p-4 border-b border-zinc-800">
        <h1 className="text-xl font-semibold tracking-tight">
          RPG Web — App Shell
        </h1>
        <p className="text-sm text-zinc-400">clean base, ready for layout</p>
      </header>

      <main className="p-4">
        <div className="rounded-xl border border-zinc-800 p-4">
          <p className="text-zinc-300">
            Tailwind is working. Next we’ll add routing and the left-side nav.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
