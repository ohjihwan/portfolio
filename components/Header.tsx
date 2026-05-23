import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-[#09090b]/70 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* 로고 */}
        <Link href="/" className="text-lg font-bold tracking-tight hover:text-indigo-400 transition-colors">
          JIHWAN<span className="text-indigo-500">.dev</span>
        </Link>

        {/* 메뉴 */}
        <nav aria-label="메인 메뉴">
          <ul className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <li>
              <Link href="#about" className="hover:text-zinc-100 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="#projects" className="hover:text-zinc-100 transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-zinc-100 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}