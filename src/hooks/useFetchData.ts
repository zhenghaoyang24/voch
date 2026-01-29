import { useState, useEffect, useCallback } from "react";
import type { Book, Vocabulary, WordBookMapping, Example, DataMaps, Progress } from "../types";

const useFetchData = () => {
  const [dataMaps, setDataMaps] = useState<DataMaps>({
    booksMap: new Map(),
    vocabularyMap: new Map(),
    spellingMap: new Map(),
    wordBookMappingsMap: new Map(),
    examplesMap: new Map(),
    bookWordMap: new Map(),
    wordBooksMap: new Map(),
  });

  const [progress, setProgress] = useState<Progress>({
    books: 0,
    vocabulary: 0,
    wordBookMappings: 0,
    examples: 0,
    message: "",
  });

  // JSON 加载函数
  const loadJSON = async <T>(filename: string): Promise<T[]> => {
    try {
      // 使用 process.env.PUBLIC_URL 确保正确的路径
      const url = `/data/${filename}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // 检查响应内容类型
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        // 如果不是 JSON，读取文本看看返回了什么
        const text = await response.text();
        console.error("响应不是 JSON:", text.substring(0, 200));
        throw new Error(`返回的不是 JSON 格式: ${contentType}`);
      }

      const data = await response.json();
      return data as T[];
    } catch (error) {
      setProgress((prev) => ({
        ...prev,
        message: `加载 ${filename} 失败`,
      }));
      console.error(`加载 ${filename} 失败:`, error);
      throw error;
    }
  };

  // 构建 Map 索引
  const buildMaps = async (
    books: Book[],
    vocabulary: Vocabulary[],
    wordBookMappings: WordBookMapping[],
    examples: Example[],
  ): Promise<DataMaps> => {
    setProgress((prev) => ({ ...prev, message: "正在构建索引..." }));

    // 1. 基础 Map
    const booksMap = new Map<number, Book>();
    books.forEach((book) => booksMap.set(book.bookid, book));

    const vocabularyMap = new Map<number, Vocabulary>();
    const spellingMap = new Map<string, Vocabulary>();
    vocabulary.forEach((word) => vocabularyMap.set(word.wordid, word));
    vocabulary.forEach((word) => spellingMap.set(word.spelling, word));

    const wordBookMappingsMap = new Map<number, WordBookMapping>();
    wordBookMappings.forEach((mapping) => wordBookMappingsMap.set(mapping.vocbkid, mapping));

    // 2. 按 wordid 分组的例句 Map
    const examplesMap = new Map<number, Example[]>();
    examples.forEach((example) => {
      const list = examplesMap.get(example.wordid) || [];
      list.push(example);
      examplesMap.set(example.wordid, list);
    });

    // 3. 书籍和单词的关系 Map
    const bookWordMap = new Map<number, number[]>();
    const wordBooksMap = new Map<number, number[]>();

    wordBookMappings.forEach((mapping) => {
      // 添加到 bookWordMap
      const bookWords = bookWordMap.get(mapping.bookid) || [];
      if (!bookWords.includes(mapping.wordid)) {
        bookWords.push(mapping.wordid);
        bookWordMap.set(mapping.bookid, bookWords);
      }

      // 添加到 wordBooksMap
      const wordBooks = wordBooksMap.get(mapping.wordid) || [];
      if (!wordBooks.includes(mapping.bookid)) {
        wordBooks.push(mapping.bookid);
        wordBooksMap.set(mapping.wordid, wordBooks);
      }
    });

    return {
      booksMap,
      vocabularyMap,
      spellingMap,
      wordBookMappingsMap,
      examplesMap,
      bookWordMap,
      wordBooksMap,
    };
  };

  // 加载所有数据 - 使用顺序加载而不是 Promise.all
  const loadAllData = useCallback(async () => {
    try {
      setProgress({
        books: 0,
        vocabulary: 0,
        wordBookMappings: 0,
        examples: 0,
        message: "正在加载数据...",
      });

      // 按顺序加载，便于调试
      setProgress((prev) => ({ ...prev, books: 0 }));
      const books = await loadJSON<Book>("tb_book.json");
      setProgress((prev) => ({ ...prev, books: 100 }));

      setProgress((prev) => ({ ...prev, vocabulary: 0 }));
      const vocabulary = await loadJSON<Vocabulary>("tb_vocabulary.json");
      setProgress((prev) => ({ ...prev, vocabulary: 100 }));

      setProgress((prev) => ({ ...prev, wordBookMappings: 0 }));
      const wordBookMappings = await loadJSON<WordBookMapping>("tb_voc_book.json");
      setProgress((prev) => ({ ...prev, wordBookMappings: 100 }));

      setProgress((prev) => ({ ...prev, examples: 0 }));
      const examples = await loadJSON<Example>("tb_voc_examples.json");
      setProgress((prev) => ({ ...prev, examples: 100 }));

      // 构建所有 Map
      const maps = await buildMaps(books, vocabulary, wordBookMappings, examples);
      setDataMaps(maps);

      setTimeout(() => {
        setProgress((prev) => ({
          ...prev,
          message: "",
        }));
      }, 1000);
    } catch (error) {
      console.error("Data loading failed:", error);
      setProgress((prev) => ({
        ...prev,
        message: "数据加载失败",
      }));
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return {
    dataMaps,
    progress,
    retry: loadAllData,
  };
};

export default useFetchData;
