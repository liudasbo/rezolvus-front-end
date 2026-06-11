const review =
  "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.";

const testimonials = Array.from({ length: 11 }, (_, i) => ({
  name: "Dr. Emma Williams",
  rating: "5.0",
  review,
  id: i,
}));

function TestimonialCard({
  name,
  rating,
  review,
}: {
  name: string;
  rating: string;
  review: string;
}) {
  return (
    <div className="bg-white rounded-[24px] p-5 flex flex-col gap-3 shrink-0 w-[260px] sm:w-[280px] xl:w-[308px]">
      <div className="flex gap-3 items-center">
        <img
          src="/images/testimonial-avatar.svg"
          alt={name}
          className="w-12 h-12 xl:w-14 xl:h-14 rounded-full shrink-0"
        />
        <div className="flex flex-col gap-1">
          <p className="text-black text-base xl:text-xl font-medium leading-6 capitalize">{name}</p>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <img key={i} src="/images/icon-star-small.svg" alt="" className="w-4 h-4" />
              ))}
            </div>
            <span className="text-[#0D0D0D] text-sm font-normal leading-5">{rating}</span>
          </div>
        </div>
      </div>
      <p className="text-[#494947] text-sm font-normal leading-5 line-clamp-4">{review}</p>
    </div>
  );
}

export default function TestimonialsSection() {
  const row1 = testimonials.slice(0, 5);
  const row2 = testimonials.slice(5, 11);

  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 py-16 md:py-[80px] xl:py-[120px] flex flex-col gap-8 lg:gap-12 relative overflow-hidden">
      {/* Background decorative wave loops */}
      <img
        src="/images/testimonial-wave1.svg"
        alt=""
        className="absolute pointer-events-none"
        style={{ width: "1906px", height: "683px", top: "79px", left: "-425px" }}
      />
      <img
        src="/images/testimonial-wave2.svg"
        alt=""
        className="absolute pointer-events-none"
        style={{ width: "1463px", height: "683px", top: "79px", left: "-426px" }}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase">
            TESTIMONIALS
          </p>
          <h2 className="text-[#013D47] text-[28px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
            Real People, Real Result
          </h2>
        </div>
        <p className="text-[#494947] text-base lg:text-lg font-normal leading-7 max-w-full sm:max-w-[278px]">
          See how Rezolvus helps others, and find out what it can do for you
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:gap-6 w-full">
        {/* Row 1 — horizontal scroll on mobile, centered overflow on desktop */}
        <div className="-mx-5 sm:-mx-10 xl:mx-0 px-5 sm:px-10 xl:px-0 flex gap-4 lg:gap-6 overflow-x-auto no-scrollbar xl:overflow-visible xl:justify-center pb-1">
          {row1.map((t) => (
            <TestimonialCard key={t.id} name={t.name} rating={t.rating} review={t.review} />
          ))}
        </div>
        {/* Row 2 — horizontal scroll on mobile, centered overflow on desktop */}
        <div className="-mx-5 sm:-mx-10 xl:mx-0 px-5 sm:px-10 xl:px-0 flex gap-4 lg:gap-6 overflow-x-auto no-scrollbar xl:overflow-visible xl:justify-center pb-1">
          {row2.map((t) => (
            <TestimonialCard key={t.id} name={t.name} rating={t.rating} review={t.review} />
          ))}
        </div>
      </div>
    </section>
  );
}
