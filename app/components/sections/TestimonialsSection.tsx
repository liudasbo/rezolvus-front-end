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
    <div className="bg-white rounded-[24px] p-5 flex flex-col gap-3 shrink-0 w-[308px]">
      <div className="flex gap-3 items-center">
        <img
          src="/images/testimonial-avatar.svg"
          alt={name}
          className="w-14 h-14 rounded-full shrink-0"
        />
        <div className="flex flex-col gap-1">
          <p className="text-black text-xl font-medium leading-6 capitalize">{name}</p>
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
    <section className="bg-[#F6F6F5] w-full px-20 py-[120px] flex flex-col gap-12 relative overflow-hidden">
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase">
            TESTIMONIALS
          </p>
          <h2 className="text-[#013D47] text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize">
            Real People, Real Result
          </h2>
        </div>
        <p className="text-[#494947] text-lg font-normal leading-7 w-[278px]">
          See how Rezolvus helps others, and find out what it can do for you
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6 justify-center flex-wrap">
          {row1.map((t) => (
            <TestimonialCard key={t.id} name={t.name} rating={t.rating} review={t.review} />
          ))}
        </div>
        <div className="flex gap-6 justify-center flex-wrap">
          {row2.map((t) => (
            <TestimonialCard key={t.id} name={t.name} rating={t.rating} review={t.review} />
          ))}
        </div>
      </div>
    </section>
  );
}
