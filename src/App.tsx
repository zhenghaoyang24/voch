import Navbar from "./components/Navbar";
import MainLayout from "./layout/MainLayout";
import Loading from "./components/Loading";
import useFetchData from "./hooks/useFetchData";
import { vocabularyStore } from "./store/intex";
import { booksStore } from "./store/intex";
import { exampleStore } from "./store/intex";
import { useEffect, useMemo } from "react";
function App() {
  const { progress, dataMaps } = useFetchData();
  const { setVocabularyMap, setSpellingMap } = vocabularyStore();
  const { setBooksMap, setBookVocsMap } = booksStore();
  const { setExamplesMap } = exampleStore();

  const loaded = useMemo(
    () =>
      progress.books === 100 &&
      progress.vocabulary === 100 &&
      progress.wordBookMappings === 100 &&
      progress.examples === 100,
    [progress],
  );

  useEffect(() => {
    setBooksMap(dataMaps.booksMap);
    setBookVocsMap(dataMaps.bookWordMap);
    setVocabularyMap(dataMaps.vocabularyMap);
    setSpellingMap(dataMaps.spellingMap);
    setExamplesMap(dataMaps.examplesMap);
  }, [
    progress,
    dataMaps,
    setBooksMap,
    setVocabularyMap,
    setSpellingMap,
    setExamplesMap,
    setBookVocsMap,
  ]);

  return (
    <>
      {!loaded ? (
        <Loading progress={progress} />
      ) : (
        <>
          <Navbar />
          <MainLayout />
        </>
      )}
    </>
  );
}

export default App;
