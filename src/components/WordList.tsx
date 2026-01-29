import { useEffect, useMemo, useState } from "react";
import type { Book, Vocabulary } from "../types";
import { vocabularyStore } from "./../store/intex";
import { booksStore } from "./../store/intex";
import WordDetail from "./WordDetail";
import Pagination from "./Pagination";

function WordList({ book }: { book: Book }) {
  const { vocabularyMap } = vocabularyStore();
  const { getVocsByBookId } = booksStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null);

  // 获取本书籍的所有单词
  const wordListId = useMemo(() => {
    if (book && book.bookid) {
      return getVocsByBookId(book.bookid);
    } else {
      return Array.from(vocabularyMap.keys());
    }
  }, [book, vocabularyMap, getVocsByBookId]);

  const wordsTotal = useMemo(() => {
    return wordListId.length;
  }, [wordListId]);

  // 计算当前页的单词
  const currentWordIds = useMemo(() => {
    if (!wordListId || wordListId.length === 0) return [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return wordListId.slice(startIndex, endIndex);
  }, [wordListId, currentPage, itemsPerPage]);

  useEffect(() => {
    // 使用 requestAnimationFrame 或 setTimeout 避免同步更新
    requestAnimationFrame(() => {
      setSelectedWord(null);
      setCurrentPage(1);
    });
  }, [book]);

  return (
    <div className="w-full">
      <Pagination
        current={currentPage}
        total={Math.ceil(wordsTotal / itemsPerPage)}
        onChange={(page: number) => setCurrentPage(page)}
      />
      <div
        className={
          "grid grid-cols-1 gap-2 mt-2 w-full" +
          (selectedWord ? " grid-cols-[150px_minmax(0,1fr)]" : "")
        }
      >
        <div className={selectedWord ? "x-[150px]" : "w-full"}>
          {currentWordIds?.map((id) => {
            const word = vocabularyMap.get(id);
            if (word) {
              return (
                <div
                  onClick={() => setSelectedWord(word)}
                  key={word.wordid}
                  className="group w-full p-2.5 border-b border-gray-800 cursor-pointer flex justify-between items-center gap-10 overflow-hidden"
                >
                  <span className="group-hover:text-p transition-colors">{word.spelling}</span>
                  <span
                    className={
                      selectedWord
                        ? "hidden"
                        : "block" + "text-stone-400 overflow-hidden whitespace-nowrap text-ellipsis"
                    }
                  >
                    {word.paraphrase}
                  </span>
                </div>
              );
            }
          })}
        </div>
        <div className={selectedWord ? "block" : "hidden"}>
          {selectedWord && <WordDetail word={selectedWord} />}
        </div>
      </div>
    </div>
  );
}

export default WordList;
