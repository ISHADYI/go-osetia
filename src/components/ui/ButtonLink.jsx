export default function ButtonLink({ href, text, icon, variant, onClick }) {
  const baseStyles =
    "flex items-center gap-2 font-semibold transition-all duration-200 active:scale-95";

  const variants = {
    fill: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md",
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
