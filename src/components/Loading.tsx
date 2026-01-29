import useFetchData from "../hooks/useFetchData";

export default function Loading() {
  const { retry, progress } = useFetchData();

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
            {progress.code !== 500 && <p>{totalProgress}</p>}
          </div>
          {progress.code === 500 && (
            <button onClick={retry} title="retry" className="button-p">
              重试
            </button>
          )}
        </div>
      </div>
    </>
  );
}
