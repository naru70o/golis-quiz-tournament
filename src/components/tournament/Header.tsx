import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <Image src="golis-logo.png" height={402} width={400} alt="golis logo" />
      <h1>Golis quiz</h1>
    </header>
  );
}
