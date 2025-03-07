export default function Loader() {
  return (
    <div className="grid grid-cols-1 justify-center content-center h-[30vh] w-full">
      <div role="status" className="w-full flex justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    </div>
  );
}