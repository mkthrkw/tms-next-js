import Image from "next/image";
import backgroundImage from "@/public/background_neko.jpg";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <main>
        <div className="hero min-h-screen relative">
          <Image
            alt="catimage"
            src={backgroundImage}
            placeholder="blur"
            quality={100}
            fill={true}
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-100">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Nextodo</h1>
              <p>Welcome! This app is a Todo app developed using Next.js.</p>
              <p className="mb-5">It allows manage tasks easily. Give it a try!</p>
              <Link href="/nextodo" className="btn btn-secondary btn-lg">Get Started</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
