import { useMemo, useState } from "react";
import Search from "../components/Search";
import WordList from "../components/WordList";
import type { Book } from "../types";
import { booksStore } from "./../store/intex";
function MainLayout() {
  const { booksMap } = booksStore();
  const [searchStatus, setSearchStatus] = useState(false);
  const books = useMemo(() => {
    return Array.from(booksMap.values());
  }, [booksMap]);

  // 选择词书
  const [selectedBook, setSelectedBook] = useState<Book>({} as Book);
  const activeClass = "bg-p font-bold";

  const searchStatusHandler = (status: boolean) => {
    setSearchStatus(status);
  };

  return (
    <main className="max-w-6xl bg-blend-overlay mx-auto">
      <Search onNotify={searchStatusHandler} />
      {!searchStatus && (
        <div className="mt-2 grid gap-4 grid-cols-[200px_minmax(0,1fr)] ">
          <div className="flex w-50 flex-col gap-2 h-[60vh] overflow-y-auto custom-scrollbar">
            <h6>选择词书</h6>
            <div
              onClick={() => setSelectedBook({} as Book)}
              className={
                "p-1 rounded border border-amber-300 h-fit cursor-pointer " +
                (Object.keys(selectedBook).length === 0 ? activeClass : "")
              }
            >
              所有单词
            </div>
            {books.map((book) => (
              <div
                onClick={() => setSelectedBook(book)}
                key={book.bookid}
                className={
                  "p-1 rounded border border-amber-300 h-fit cursor-pointer " +
                  (selectedBook.bookid === book.bookid ? activeClass : "")
                }
              >
                {book.bookname}
              </div>
            ))}
          </div>
          <div>
            <WordList book={selectedBook} />
          </div>
        </div>
      )}
    </main>
  );
}

export default MainLayout;
