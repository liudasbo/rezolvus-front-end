import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute top-4 left-4 right-4 z-20">
      <div className="bg-white/5 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="relative h-6 w-[106px] shrink-0">
          <Image src="/images/logo-nav.svg" alt="Rezolvus" fill className="object-contain" />
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {["Find Specialists", "How It Works", "For Specialists", "Reviews", "About"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-white text-base font-normal leading-6 whitespace-nowrap hover:opacity-80 transition-opacity"
              >
                {link}
              </a>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="border border-white rounded-full px-6 py-2 text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-white/10 transition-colors"
          >
            Login
          </a>
          <a
            href="#"
            className="bg-[#FB652B] rounded-full px-6 py-2 text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-[#e85520] transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
