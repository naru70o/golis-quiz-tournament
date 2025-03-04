function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="flex justify-between items-center">{children}</footer>
  );
}

export default Footer;
