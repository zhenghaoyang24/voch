import { useState } from "react";
import type { Vocabulary } from "../types";
import WordDetail from "./WordDetail";
import { vocabularyStore } from "./../store/intex";

interface SearchProps {
  onNotify: (status: boolean) => void;
}

function Search({ onNotify }: SearchProps) {
  const { getVocabularyBySpelling } = vocabularyStore();
  const [inputValue, setInputValue] = useState("");
  const [word, setWord] = useState<Vocabulary>({} as Vocabulary);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const searchStatusHandler = (status: boolean) => {
    setWord({} as Vocabulary);
    onNotify(status);
  };

  /**
   * 根据输入内容，搜索单词与例句
   * @param e
   * @returns
   */
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    const query = e.target.value.trim().toLowerCase();
    setInputValue(e.target.value);
    if (!query) {
      searchStatusHandler(false);
      return;
    }
    searchStatusHandler(true);
    setTimer(
      setTimeout(() => {
        const res = getVocabularyBySpelling(query);
        setWord(res);
      }, 300),
    );
  };

  return (
    <div className="w-full relative mt-4">
      <input
        className="w-full input-p py-2 px-3"
        value={inputValue}
        onChange={inputChangeHandler}
        type="text"
        placeholder="Search..."
      />
      {inputValue && <WordDetail word={word} />}
    </div>
  );
}

export default Search;
