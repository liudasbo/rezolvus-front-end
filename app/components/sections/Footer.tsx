const navCols = [
  {
    heading: "Platform",
    links: ["Find Specialists", "How It Works", "For Specialists", "Reviews", "Pricing"],
  },
  {
    heading: "Support",
    links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
  {
    heading: "Company",
    links: ["About Us", "Careers", "Blog", "Press", "Partners"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#013D47] w-full flex flex-col gap-16 pb-10 pt-16 px-20">
      <div className="flex gap-[120px] items-start">
        <div className="flex flex-col gap-3 shrink-0 max-w-[494px]">
          <p className="text-white text-2xl font-medium leading-[39px]">Rezolvus</p>
          <p className="text-white/80 text-base font-normal leading-7">
            Discover verified psychologists, physiotherapists, wellness specialists,
            and more — all in one modern platform designed around trust and simplicity.
          </p>
        </div>

        <div className="flex flex-1 justify-between">
          {navCols.map((col) => (
            <div key={col.heading} className="flex flex-col gap-2">
              <p className="text-white text-2xl font-medium leading-[39px]">{col.heading}</p>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/80 text-base font-normal leading-7 hover:text-white transition-colors whitespace-nowrap"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="relative w-full" style={{ aspectRatio: "115/26" }}>
          <img
            src="/images/logo-footer.png"
            alt="Rezolvus"
            className="w-full h-full object-contain object-left"
          />
        </div>
        <div className="flex items-center justify-between text-white/80 text-base font-normal leading-7">
          <span>© 2026 Rezolvus. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service · Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}
