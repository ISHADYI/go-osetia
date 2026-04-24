export default function ButtonLink({ href, text, icon, variant, onClick }) {
  const baseStyles =
    "flex items-center gap-2 font-semibold transition-all duration-200 active:scale-95";

  const variants = {
    defaultFill:
      "py-[12px] px-[30px] bg-[#EC562A] text-white hover:bg-[#D04117] shadow-md rounded-[100px]",
    whiteFill:
      "py-[12px] px-[30px] bg-[#FFFFFF] text-[#EC562A] hover:bg-[#EC562A] hover:text-white shadow-md rounded-[100px]",
    notFill: "bg-transparent text-gray-600 hover:bg-gray-100",
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
