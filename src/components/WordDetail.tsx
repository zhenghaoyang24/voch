import { useMemo } from "react";
import type { Vocabulary, Example } from "../types";
import JsonBox from "./JsonBox";
import { exampleStore } from "./../store/intex";
interface Props {
  word: Vocabulary;
}
function WordDetail({ word }: Props) {
  const { getExampleByWordId } = exampleStore();
  const examples = useMemo(() => {
    if (word && word.wordid) {
      return getExampleByWordId(word.wordid);
    }
    return [];
  }, [word, getExampleByWordId]);

  return (
    <div className="p-2 flex-1">
      {!word.spelling ? (
        <div className="text-sm text-gray-500 text-center py-10">没有这个单词信息</div>
      ) : (
        <>
          <div>
            <h6 className="text-lg font-bold">单词信息 - {word.spelling}</h6>
            <JsonBox<Vocabulary> data={word} />
          </div>
          <div>
            <h6 className="text-lg font-bold">单词例句 - {examples.length}</h6>
            <JsonBox<Example[]> data={examples} />
          </div>
        </>
      )}
    </div>
  );
}

export default WordDetail;
