import Container from "./ui/Container";
import { Logo } from "./ui/Logo";
import SearchInput from "./ui/SearchInput";

export function Header() {
  return (
    <Container>
      <div className="flex items-center gap-6 justify-between">
        <Logo />
        <SearchInput />
      </div>
    </Container>
  );
}
