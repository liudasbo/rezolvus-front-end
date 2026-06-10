const items = ["Nutritionist", "Psychologist", "Therapist", "Wellness Coach", "Physiotherapist"];

export default function TickerSection() {
  const doubled = [...items, ...items];

  return (
    <section className="bg-[#F6F6F5] w-full px-20 py-20">
      <div className="bg-[#67CDCD] rounded-[24px] h-[127px] overflow-hidden relative flex items-center">
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #67CDCD 0%, transparent 15%, transparent 85%, #67CDCD 100%)",
          }}
        />
        <div
          className="flex items-center gap-[68px] whitespace-nowrap"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-[68px] shrink-0">
              <span className="text-white text-[52px] font-medium leading-[74px]">{item}</span>
              <img src="/images/ticker-dot.svg" alt="" className="w-2.5 h-2.5 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
