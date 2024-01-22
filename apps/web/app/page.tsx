import { Home, SkipForward } from "lucide-react";

export default function Page(): JSX.Element {
  return (
    <main className="w-[100%] h-[100vh] bg-gradient-to-br from-[#ffd89b] to-[#19547b] font-primary">
      <div className="game">
        <div className="home flex flex-row pt-12 items-center text-white text-5xl justify-around font-bold">
          <div id="home">
            <Home size={48} />
          </div>
          <div className="point">{2}</div>
          <div className="skip">
            <SkipForward size={48} />
          </div>
        </div>

        <div className="time text-white text-3xl font-bold text-center p-12">
          {"01:30"}
        </div>

        <div className="words text-white flex flex-col items-center justify-center gap-12 text-7xl font-sans p-12">
          {"k/i/a/h/ô/c/g/n"}
        </div>

        <div className="input-container flex flex-col items-center justify-center p-12">
          <input
            type="text"
            className="input w-[50%] h-16 rounded-lg p-2"
            placeholder="Nhập đáp án"
          />
        </div>
      </div>

      <div className="footer text-center text-sm font-sans bottom-0 fixed m-auto w-full p-4">
        © Copyright 2024
      </div>
    </main>
  );
}
