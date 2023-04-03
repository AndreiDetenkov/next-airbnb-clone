import { Container } from '@/app/components/Container';
import { Logo } from '@/app/components/navbar/Logo';
import { Search } from '@/app/components/navbar/Search';

export const Navbar = (): JSX.Element => {
  return (
    <div className="fixed w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
          </div>
        </Container>
      </div>
    </div>
  );
};
