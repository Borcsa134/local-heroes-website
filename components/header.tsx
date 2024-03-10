import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@nextui-org/link';
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="container mx-auto px-2 lg: px-4">
      <Navbar isBordered shouldHideOnScroll classNames={{ wrapper: 'w-[990px] justify-between' }}>
        <NavbarContent className="hidden gap-4 sm:flex sm:leading-[4rem] " justify="center">
          <NavbarItem>
            <Link href="/">
              <Image src="/lh-logo-white.png" width={64} height={64} alt="lh-logo" />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/news">Hírek</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/">Események</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/">Szerepjáték</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/">Magic Est</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex sm:leading-[4rem]" justify="end">
          <NavbarItem>
            <Link href={process.env.DISCORD_URL}>
              <p className="flex flex-row items-center">
                Discord <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 pl-2" />
              </p>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/">A körről</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
