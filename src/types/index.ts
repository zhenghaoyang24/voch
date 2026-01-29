// 定义类型
export interface Book {
  bookid: number;
  bookname: string;
  voccount: number;
  status: string | null;
}

export interface Vocabulary {
  wordid: number;
  spelling: string;
  UKphonetic: string | null;
  USphonetic: string | null;
  paraphrase: string;
  frequency: number;
}

export interface WordBookMapping {
  vocbkid: number;
  wordid: number;
  bookid: number;
}

export interface Example {
  expid: number;
  wordid: number;
  en: string;
  cn: string;
  heat: number;
  adddate: string;
}

export interface Progress {
  books: number;
  vocabulary: number;
  wordBookMappings: number;
  examples: number;
  message: string;
}

export interface DataMaps {
  booksMap: Map<number, Book>;
  vocabularyMap: Map<number, Vocabulary>;
  spellingMap: Map<string, Vocabulary>;
  wordBookMappingsMap: Map<number, WordBookMapping>;
  examplesMap: Map<number, Example[]>;
  bookWordMap: Map<number, number[]>; // bookid -> wordid[]
  wordBooksMap: Map<number, number[]>; // wordid -> bookid[]
}