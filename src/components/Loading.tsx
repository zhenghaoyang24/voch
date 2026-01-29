import useFetchData from "../hooks/useFetchData";

export default function Loading() {
  const { progress } = useFetchData();

  const totalProgress =
    Math.round(
      (progress.books + progress.vocabulary + progress.wordBookMappings + progress.examples) / 100,
    ).toString() + "/4";
  return (
    <>
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-bg flex justify-center items-center z-50">
        <div className="flex flex-col items-center h-auto gap-2">
          <div className="flex items-center gap-1 justify-center">
            <p>{progress.message}</p>
            {progress.books !== 100 &&
              progress.vocabulary !== 100 &&
              progress.wordBookMappings !== 100 &&
              progress.examples !== 100 && <p>{totalProgress}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
