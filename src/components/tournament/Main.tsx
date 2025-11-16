function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="container max-w-7xl relative grid grid-cols-1 justify-center content-center h-full w-full font-[var(--quicksand)] p-4">
      {children}
    </main>
  );
}

export default Main;
