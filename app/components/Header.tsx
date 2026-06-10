import Image from "next/image";

const navLinks = [
  { label: "Find Specialists", href: "/find-specialists", weight: "normal" },
  { label: "How It Works", href: "#", weight: "normal" },
  { label: "For Specialists", href: "#", weight: "normal" },
  { label: "Reviews", href: "#", weight: "medium" },
  { label: "About", href: "#", weight: "medium" },
];

interface HeaderProps {
  activePage?: string;
}

export default function Header({ activePage }: HeaderProps = {}) {
  return (
    <header className="absolute top-4 left-4 right-4 z-20">
      <div className="bg-white/5 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="relative h-6 w-[106px] shrink-0">
          <Image src="/images/logo-nav.svg" alt="Rezolvus" fill className="object-contain" />
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {navLinks.map(({ label, href, weight }) =>
            activePage === label ? (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 text-[#FB652B] text-base font-normal leading-6 whitespace-nowrap opacity-90"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-[#FB652B] shrink-0" />
                {label}
              </a>
            ) : (
              <a
                key={label}
                href={href}
                className={`text-white text-base leading-6 whitespace-nowrap hover:opacity-80 transition-opacity ${weight === "medium" ? "font-medium" : "font-normal"}`}
              >
                {label}
              </a>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="border-[1.5px] border-white rounded-full px-6 py-2 text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-white/10 transition-colors"
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
