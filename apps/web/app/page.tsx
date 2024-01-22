import Game from "./components/Game";

export default function Page(): JSX.Element {
  return (
    <main className="w-[100%] h-[100vh] bg-gradient-to-br from-[#ffd89b] to-[#19547b] font-primary">
      <Game />

      <div className="footer text-center text-sm font-sans bottom-0 fixed m-auto w-full p-4">
        © Copyright 2024
      </div>
    </main>
  );
}
