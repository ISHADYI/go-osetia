import Container from "./ui/Container";
import { Logo } from "./ui/Logo";
import SearchInput from "./ui/SearchInput";
import ButtonLink from "./ui/ButtonLink";

import heartIcon from "../assets/icons/heart-outline.svg";
import userIcon from "../assets/icons/user.svg";
import burgerMenu from "../assets/icons/menu-burger.svg";

export function Header() {
  return (
    <Container>
      <header className="flex items-center gap-6 justify-evenly mt-7.5 mb-12.5">
        <div className="flex items-center gap-9.5">
          <Logo />
          <ButtonLink
            href="#"
            text="Каталог"
            icon={burgerMenu}
            ф
            variant="notFill"
          />
        </div>
        <SearchInput />
        <div className="flex items-center gap-6">
          <ButtonLink
            href="#"
            text="Мои планы"
            icon={heartIcon}
            variant="notFill"
          />
          {/* href указывать в {}? */}
          <ButtonLink href="#" text="Войти" icon={userIcon} variant="notFill" />
        </div>
      </header>
    </Container>
  );
}
