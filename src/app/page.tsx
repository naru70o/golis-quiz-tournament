import Link from "next/link";

export default function page() {
  return (
    <div className="grid grid-cols-1 justify-center content-center h-screen w-full">
      <div role="status" className="w-full flex justify-center ">
        <div className="max-w-5xl text-center text-3xl">
          this page is in a development mode so if you are authenticated you can
          see this page{" "}
          <Link href="/majors" className="text-red-300">
            Fuculties
          </Link>{" "}
          or{" "}
          <Link href="/sign-in" className="text-red-300">
            sign-in
          </Link>
        </div>
      </div>
    </div>
  );
}