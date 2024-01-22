"use client";
import {
  Home,
  SkipForward,
  SendHorizontal,
  CheckCircle,
  XCircle,
} from "lucide-react";
import data from "../words.json";
import { useEffect, useRef, useState } from "react";
import { toggleTadaAnimation } from "../utils/toggleTadaAnimation";
import { getRandomWord } from "../utils/getRandomNumber";
import { formatTime } from "../utils/formatCountdown";

const words = data
  .filter((item) => item.vietnamese.split(" ").length === 2)
  .map((item) => item.vietnamese);

const defaultSkip = 3;
const defaultTime = 90;
const defaultPoint = 0;

export default function Game(): JSX.Element {
  const [answer, setAnswer] = useState("");
  const [listAnswer, setListAnswer] = useState<string[]>([]);
  const [randomWord, setRandomWord] = useState("");
  const [result, setResult] = useState("");
  const [point, setPoint] = useState(defaultPoint);
  const [skip, setSkip] = useState(defaultSkip);
  const [checkStatus, setCheckStatus] = useState("default");
  const [icon, setIcon] = useState(<SendHorizontal size={36} />);
  const [time, setTime] = useState(defaultTime);
  
  const resultRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setResult("");
    setPoint(defaultPoint);
    setSkip(defaultSkip);
    setTime(defaultTime);
  };

  const newWord = () => {
    const [word, exam] = getRandomWord(words, listAnswer);
    console.log(word);
    setListAnswer((prev) => [...prev, word]);
    setAnswer(word);
    setRandomWord(exam);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSkip = () => {
    if (skip < 1) {
      return;
    }
    setSkip((prev) => prev - 1);
    newWord();
  };

  const handleSubmit = () => {
    if (result.toLocaleLowerCase() === answer.toLocaleLowerCase()) {
      setPoint((prev) => prev + 1);
      setCheckStatus("success");
      newWord();
      setResult("");
    } else {
      toggleTadaAnimation(resultRef.current);
      setCheckStatus("fail");
    }
  };

  useEffect(() => {
    newWord();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    if (checkStatus === "success") {
      setIcon(<CheckCircle color="green" size={36} />);
    } else if (checkStatus === "fail") {
      setIcon(<XCircle color="red" size={36} />);
    }

    const timeout = setTimeout(() => {
      setCheckStatus("default");
      setIcon(<SendHorizontal size={36} />);
    }, 300);

    return () => clearTimeout(timeout);
  }, [checkStatus]);

  return (
    <div className="game">
      <div className="home flex flex-row pt-12 items-center text-white text-5xl justify-around font-bold">
        <div id="home">
          <Home
            size={48}
            onClick={() => handleReset()}
            className="cursor-pointer"
          />
        </div>
        <div id="point" className="select-none">
          {point}
        </div>
        <div
          id="skip"
          className="flex flex-row items-center gap-1 text-4xl hover:cursor-pointer select-none"
        >
          {skip}
          <SkipForward size={40} onClick={() => handleSkip()} />
        </div>
      </div>

      <div className="time text-white text-3xl font-bold text-center p-12 select-none">
        {formatTime(time)}
      </div>

      <div
        id="exam"
        className="text-white flex flex-col items-center justify-center gap-12 text-7xl font-sans p-12 max-h-12 select-none"
      >
        {randomWord ? (
          <div>{randomWord}</div>
        ) : (
          <div className="animate-pulse">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </div>

      <div
        id="result"
        className="input-container flex flex-row items-center justify-center p-12 gap-1"
      >
        <input
          type="text"
          ref={resultRef}
          className="input w-[50%] h-16 rounded-lg p-2 text-4xl"
          placeholder="Nhập đáp án"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-16 h-16 flex flex-row items-center justify-center bg-white rounded-lg hover"
        >
          {icon}
        </button>
      </div>
    </div>
  );
}
