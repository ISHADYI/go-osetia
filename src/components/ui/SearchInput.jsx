export default function SearchInput() {
    return (
      <div className="flex items-center bg-[#EDEDED] rounded-[100px] px-5 py-2 gap-2 min-w-162.5">
        <input className="bg-transparent outline-none w-full placeholder:text-[16px]" type="search" placeholder="Поиск..." />
        <img src="/images/icons/search.svg" alt="Иконка поиска" />
      </div>
    );
}   