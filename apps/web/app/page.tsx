"use client"
import { useState } from "react";
import { Game } from "./components/Game";
import { Home } from "./components/Home";

export default function Page(): JSX.Element {
  const [start, setStart] = useState(false);

  const handleStartClick = () => {
    setStart(true);
  };

  const handleHomeClick = () => {
    setStart(false);
  };

  return (
    <main className="w-[100%] h-[100vh] bg-gradient-to-br from-[#ffd89b] to-[#19547b] font-primary">
      {start ? <Game onHomeClick={handleHomeClick}/> : <Home onStartClick={handleStartClick} />}

      <div className="footer text-center text-sm font-sans bottom-0 fixed m-auto w-full p-4">
        © Copyright 2024
      </div>
    </main>
  );
}
