import { Link } from "react-router-dom";

export default function ButtonLink({ to, href, text, icon, variant, onClick }) {
  const targetPath = to || href;

  const baseStyles =
    "flex font-inherit items-center gap-2 font-semibold transition-all duration-300 active:scale-95";

  const variants = {
    orangeFill:
      "py-[12px] px-[40px] bg-orange text-white rounded-[100px] hover:bg-black",
    whiteFill:
      "py-[12px] px-[40px] bg-white text-black rounded-[100px] hover:bg-black hover:text-white",
    blackFill:
      "py-[12px] px-[40px] bg-black text-white rounded-[100px] hover:bg-orange",
    notFill:
      "bg-transparent text-gray-700 font-semibold px-4 py-2 rounded-xl transition-all duration-300 hover:text-[#EC562A] hover:bg-orange-50/50 active:scale-95",
    header:
      "text-[14px] font-bold hover:text-[#F15431] transition-colors font-bold",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]}`;

  const renderContent = () => (
    <>
      {icon && (
        <img src={icon} alt="иконка" className="w-6 h-6 object-contain" />
      )}
      <span>{text}</span>
    </>
  );

  if (targetPath) {
    return (
      <Link to={targetPath} className={combinedClasses}>
        {renderContent()}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={combinedClasses} type="button">
      {renderContent()}
    </button>
  );
}
