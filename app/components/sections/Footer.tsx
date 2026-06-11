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
    <footer className="bg-[#013D47] w-full flex flex-col gap-12 lg:gap-16 pb-8 lg:pb-10 pt-12 lg:pt-16 px-5 sm:px-10 xl:px-20">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-[80px] xl:gap-[120px] items-start">
        <div className="flex flex-col gap-3 shrink-0 max-w-full lg:max-w-[360px] xl:max-w-[494px]">
          <p className="text-white text-2xl font-medium leading-[39px]">Rezolvus</p>
          <p className="text-white/80 text-base font-normal leading-7">
            Discover verified psychologists, physiotherapists, wellness specialists,
            and more — all in one modern platform designed around trust and simplicity.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 flex-1 w-full">
          {navCols.map((col) => (
            <div key={col.heading} className="flex flex-col gap-2">
              <p className="text-white text-xl xl:text-2xl font-medium leading-[1.6]">{col.heading}</p>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/80 text-sm xl:text-base font-normal leading-7 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="relative w-full" style={{ aspectRatio: "115/26" }}>
          <img
            src="/images/logo-footer.svg"
            alt="Rezolvus"
            className="w-full h-full object-contain object-left"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-white/80 text-sm xl:text-base font-normal leading-7">
          <span>© 2026 Rezolvus. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service · Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}
