import { create } from "zustand";
import type { Vocabulary, Book, Example } from "../types/index";

/**
 * vocabulary store
 */
interface VocabularyState {
  vocabularyMap: Map<number, Vocabulary>;
  setVocabularyMap: (vocabularyMap: Map<number, Vocabulary>) => void;
  getVocabularyById: (wordid: number) => Vocabulary;
  spellingMap: Map<string, Vocabulary>;
  setSpellingMap: (spellingMap: Map<string, Vocabulary>) => void;
  getVocabularyBySpelling: (spelling: string) => Vocabulary;
}

export const vocabularyStore = create<VocabularyState>()((set, get) => ({
  vocabularyMap: new Map<number, Vocabulary>(),
  setVocabularyMap: (vocabularyMap: Map<number, Vocabulary>) =>
    set(() => ({ vocabularyMap: vocabularyMap })),
  getVocabularyById: (wordid: number) => get().vocabularyMap.get(wordid) || ({} as Vocabulary),
  spellingMap: new Map<string, Vocabulary>(),
  setSpellingMap: (spellingMap: Map<string, Vocabulary>) =>
    set(() => ({ spellingMap: spellingMap })),
  getVocabularyBySpelling: (spelling: string) => {
    return get().spellingMap.get(spelling) || ({} as Vocabulary);
  },
}));

/**
 * book store
 */
interface BookState {
  booksMap: Map<number, Book>;
  setBooksMap: (booksMap: Map<number, Book>) => void;
  getBookById: (bookid: number) => Book;
  bookVocsMap: Map<number, number[]>;
  setBookVocsMap: (bookVocsMap: Map<number, number[]>) => void;
  getVocsByBookId: (bookid: number) => number[];
}

export const booksStore = create<BookState>()((set, get) => ({
  booksMap: new Map<number, Book>(),
  setBooksMap: (booksMap: Map<number, Book>) => set(() => ({ booksMap: booksMap })),
  getBookById: (bookid: number) => get().booksMap.get(bookid) || ({} as Book),
  bookVocsMap: new Map<number, number[]>(),
  setBookVocsMap: (bookVocsMap: Map<number, number[]>) => set(() => ({ bookVocsMap: bookVocsMap })),
  getVocsByBookId: (bookid: number) => get().bookVocsMap.get(bookid) || [],
}));

/**
 * example store
 */
interface ExampleState {
  examplesMap: Map<number, Example[]>;
  setExamplesMap: (examplesMap: Map<number, Example[]>) => void;
  getExampleByWordId: (woridid: number) => Example[];
}

export const exampleStore = create<ExampleState>()((set, get) => ({
  examplesMap: new Map<number, Example[]>(),
  setExamplesMap: (examplesMap: Map<number, Example[]>) =>
    set(() => ({ examplesMap: examplesMap })),
  getExampleByWordId: (wordid: number) => get().examplesMap.get(wordid) || [],
}));
