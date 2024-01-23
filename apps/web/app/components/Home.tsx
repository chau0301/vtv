import React from "react";

interface HomeProps {
  onStartClick: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStartClick }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-white font text-5xl select-none">Vua Tiếng Việt</h1>
      </div>

      <div className="flex flex-col items-center justify-center p-8 h-full">
        <button
          className="bg-white text-black font-bold text-2xl  px-8 py-2 rounded-md"
          onClick={onStartClick}
        >
          Start
        </button>
      </div>
    </div>
  );
};
