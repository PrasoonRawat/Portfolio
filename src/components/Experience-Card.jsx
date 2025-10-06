export function ExperienceCard({ company, role, startDate, endDate, description }) {
  return (
    <div className="border-l-2 border-[#fff674] pl-6 pb-8 last:pb-0">
      <div className="space-y-2">
        <h3 className="text-2xl md:text-3xl font-bold text-white">{company}</h3>
        <p className="text-lg md:text-xl text-[#fff674] font-semibold">{role}</p>
        <p className="text-sm md:text-base text-white/60 font-mono">
          {startDate} - {endDate}
        </p>
        {description && (
          <p className="text-base md:text-lg text-white/80 leading-relaxed pt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
