function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="flex justify-between items-center -translate-y-[100%]">
      {children}
    </footer>
  );
}

export default Footer;
