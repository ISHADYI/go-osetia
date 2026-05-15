export default function ButtonLink({ href, text, icon, variant, onClick }) {
  const baseStyles =
    "flex font-inherit items-center gap-2 transition-all duration-200 active:scale-95";

  const variants = {
    defaultFill:
      "py-[12px] px-[30px] bg-orange font-semibold text-white rounded-[100px] transition-all duration-300 hover:bg-[#d44324]",
    whiteFill:
      "py-[12px] px-[30px] bg-[#FFFFFF] font-semibold text-[#EC562A] rounded-[100px] transition-all duration-300 hover:bg-[#FFF5F2] hover:-translate-y-0.5 active:scale-95",
    notFill:
      "bg-transparent text-gray-700 font-semibold px-4 py-2 rounded-xl transition-all duration-300 hover:text-[#EC562A] hover:bg-orange-50/50 active:scale-95",
    header:
      "text-[14px] font-bold hover:text-[#F15431] transition-colors font-bold",
  };

  return (
    <a
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} cursor-pointer`}
    >
      {icon && (
        <img src={icon} alt="иконка" className="w-6 h-6 object-contain" />
      )}
      <span>{text}</span>
    </a>
  );
}
