import Container from "./ui/Container";

export default function Footer() {
  return (
    <footer className="bg-[#F15431] text-white rounded-t-[60px] pt-16 pb-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4">
          <div className="flex items-start gap-2 col-span-1">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden p-1">
              <img
                src="/images/icons/logo.svg"
                alt="Logo"
                className="w-full object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">KudaOsetia</span>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="hover:underline opacity-90 transition-opacity"
            >
              Афиша города
            </a>
            <a
              href="#"
              className="hover:underline opacity-90 transition-opacity"
            >
              Интересные места
            </a>
            <a
              href="#"
              className="hover:underline opacity-90 transition-opacity"
            >
              Создать встречу
            </a>
            <a
              href="#"
              className="hover:underline opacity-90 transition-opacity"
            >
              Карта
            </a>
            <a
              href="#"
              className="hover:underline opacity-90 transition-opacity"
            >
              О проекте
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="hover:underline opacity-90 transition-opacity"
            >
              Пользовательское соглашение
            </a>
            <a
              href="#"
              className="hover:underline opacity-90 transition-opacity"
            >
              Правила
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold mb-1">Связаться с нами</h4>
            <a
              href="https://t.me/..."
              target="_blank"
              className="underline underline-offset-4 decoration-1 opacity-90 hover:opacity-100 transition-opacity"
            >
              Telegram
            </a>
            <a
              href="https://vk.com/..."
              target="_blank"
              className="underline underline-offset-4 decoration-1 opacity-90 hover:opacity-100 transition-opacity"
            >
              ВКонтакте
            </a>
            <a
              href="#"
              className="underline underline-offset-4 decoration-1 opacity-90 hover:opacity-100 transition-opacity"
            >
              Тех.поддержка
            </a>
            <a
              href="#"
              className="underline underline-offset-4 decoration-1 opacity-90 hover:opacity-100 transition-opacity"
            >
              Пожаловаться
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold mb-1">Разработчики</h4>
            <div className="flex flex-col">
              <span className="text-sm opacity-70">Дизайнер</span>
              <a href="#" className="underline underline-offset-4 decoration-1">
                Пункт
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-sm opacity-70">Разработчик</span>
              <a href="#" className="underline underline-offset-4 decoration-1">
                Пункт
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/20 text-center text-sm opacity-60">
          © {new Date().getFullYear()} KudaOsetia. Все права защищены.
        </div>
      </Container>
    </footer>
  );
}
