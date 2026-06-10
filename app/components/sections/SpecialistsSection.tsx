import Image from "next/image";

const specialists = [
  {
    name: "Dr. Emma Williams",
    role: "Psychologist",
    specialty: "Physiotherapist",
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique.",
    rating: "4.9",
    reviews: "1.2K reviews",
    tags: ["In person"],
    photo: "/images/specialist-1.jpg",
  },
  {
    name: "Maureen Schimmel-Torp",
    role: "Psychologist",
    specialty: "Physiotherapist",
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique.",
    rating: "4.9",
    reviews: "1.2K reviews",
    tags: ["In person"],
    photo: "/images/specialist-2.jpg",
  },
  {
    name: "Stephanie Morar",
    role: "Psychologist",
    specialty: "Physiotherapist",
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique.",
    rating: "4.9",
    reviews: "1.2K reviews",
    tags: ["In person", "Online"],
    photo: "/images/specialist-3.jpg",
  },
  {
    name: "Lamar Mohr",
    role: "Psychologist",
    specialty: "Physiotherapist",
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique.",
    rating: "4.9",
    reviews: "1.2K reviews",
    tags: ["Online"],
    photo: "/images/specialist-4.jpg",
  },
];

const tagIcon: Record<string, string> = {
  "In person": "/images/icon-armchair.svg",
  Online: "/images/icon-laptop.svg",
};

export default function SpecialistsSection() {
  return (
    <section className="bg-[#013D47] w-full px-20 py-[120px] flex flex-col gap-12 relative">
      <img
        src="/images/spec-heart.svg"
        alt=""
        className="absolute top-[76px] right-[217px] w-[217px] pointer-events-none"
      />

      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col gap-4">
          <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase">
            EXPERTS YOU CAN TRUST
          </p>
          <h2 className="text-white text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize">
            Top Rated Specialists
          </h2>
        </div>
        <button className="border border-white rounded-full h-10 px-6 flex items-center gap-2 text-white text-base font-medium leading-6 hover:bg-white/10 transition-colors">
          <img src="/images/icon-arrow-right.svg" alt="" className="w-5 h-5" />
          View All
          <img src="/images/icon-arrow-right.svg" alt="" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {specialists.map((s) => (
          <div
            key={s.name}
            className="bg-white rounded-[24px] p-2 flex flex-col gap-4 shrink-0 w-[308px]"
          >
            <div className="relative h-[290px] rounded-[16px] overflow-hidden">
              <Image src={s.photo} alt={s.name} fill className="object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white rounded-full px-3 py-1 text-sm font-normal leading-5 text-black flex items-center gap-2"
                  >
                    <img src={tagIcon[tag]} alt="" className="w-4 h-4" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 px-3 pb-2">
              <div className="flex flex-col gap-1">
                <p className="text-black text-xl font-medium leading-6 capitalize">{s.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[rgba(13,13,13,0.65)] text-xs font-normal leading-5">
                    {s.role}
                  </span>
                  <img src="/images/icon-dot.svg" alt="" className="w-1 h-1" />
                  <span className="text-[rgba(13,13,13,0.65)] text-xs font-normal leading-5">
                    {s.specialty}
                  </span>
                </div>
              </div>
              <p className="text-[rgba(13,13,13,0.7)] text-sm font-normal leading-5 line-clamp-3">
                {s.bio}
              </p>
              <div className="flex items-center gap-2">
                <img src="/images/icon-star.svg" alt="" className="w-5 h-5" />
                <div className="flex gap-1 text-base leading-6">
                  <span className="text-[#0D0D0D] font-medium">{s.rating}</span>
                  <span className="text-[rgba(13,13,13,0.35)] font-normal">({s.reviews})</span>
                </div>
              </div>
            </div>

            <div className="px-2 pb-2">
              <button className="w-full border border-[#FB652B] rounded-full h-10 text-[#FB652B] text-base font-medium leading-6 hover:bg-[#FB652B]/10 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-8 w-full">
        <div className="flex-1 h-2 bg-white/10 rounded-full relative">
          <div className="absolute left-0 top-0 h-full w-[206px] bg-white rounded-full" />
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <img src="/images/icon-arrow-right.svg" alt="Previous" className="w-5 h-5 rotate-180" />
          </button>
          <button className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <img src="/images/icon-arrow-right.svg" alt="Next" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
