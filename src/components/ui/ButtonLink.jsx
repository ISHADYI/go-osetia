export default function ButtonLink({ href, text, icon, variant, onClick }) {
  const baseStyles =
    "flex items-center gap-2 font-semibold transition-all duration-200 active:scale-95";

  const variants = {
    defaultFill:
      // "py-[12px] px-[30px] bg-[#EC562A] text-white hover:bg-[#D04117] shadow-md rounded-[100px]",
      "py-[12px] px-[30px] bg-[#EC562A] text-white rounded-[100px] transition-all duration-300 ease-in-out hover:bg-[#FF6B3D] hover:-translate-y-0.5 active:scale-95",
    whiteFill:
      // "py-[12px] px-[30px] bg-[#FFFFFF] text-[#EC562A] hover:bg-[#EC562A] hover:text-white shadow-md rounded-[100px]",
      "py-[12px] px-[30px] bg-[#FFFFFF] text-[#EC562A] rounded-[100px] transition-all duration-300 hover:bg-[#FFF5F2] hover:-translate-y-0.5 active:scale-95",
    notFill:
      "bg-transparent text-gray-700 px-4 py-2 rounded-xl transition-all duration-300 hover:text-[#EC562A] hover:bg-orange-50/50 active:scale-95",
    // "bg-transparent text-gray-600 hover:bg-gray-100",
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
