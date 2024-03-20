import { HomeIcon } from "lucide-react";
import Link from "next/link";




interface HomeIconProps {
  className?: string;
}

export default function Header() {
  return (
    <header className="py-10.5">
      <div className="container grid items-center gap-4 px-6 text-center md:gap-8 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
            <HomeIcon className="w-6 h-6" />
            <span>Home</span>
        </Link>
      </div>
    </header>
  );
}
