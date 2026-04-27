export function RunningLine() {
  const text = "Найди свою компанию ✦ ";
  const repeatText = Array(10).fill(text).join("");

  return (
    <section className="mb-20">
      <div className="relative flex overflow-hidden bg-[#f15a24] py-4 select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-white text-2xl font-bold uppercase tracking-wider">
            {repeatText}
          </span>
          <span className="text-white text-2xl font-bold uppercase tracking-wider">
            {repeatText}
          </span>
        </div>
      </div>
    </section>
  );
}
