import { shuffleString } from "./shuffleString";

function getRandomNumber(min: number, max: number, except: number[] = []): number {
  let randomNumber;

  do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (except.includes(randomNumber));

  return randomNumber;
}

function getRandomArrayNumbers(length: number = 1): number[] {
  return Array.from({ length }, () => getRandomNumber(0, 9, []));
}

function getRandomWord(words: string[], except: string[] = []): [string, string] {
  if (words.length <= except.length) {
    return ["", ""];
  }

  const exceptIndexes = except.map((item) => words.indexOf(item));
  const randomNumber = getRandomNumber(0, words.length - 1, exceptIndexes);
  const randomWord = words.at(randomNumber % words.length) || "";
  const exam = shuffleString(randomWord);

  return [randomWord, exam];
};

export { getRandomNumber, getRandomArrayNumbers, getRandomWord }