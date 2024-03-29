'use client';
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

class menuItem {
  constructor(
    public name: string,
    public link: string,
    public isExternal: boolean
  ) {}
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const discordUrl = process.env.DISCORD_URL;
  const menuItems = [
    new menuItem('Kezdőlap', '/', false),
    new menuItem('Hírek', '/news', false),
    new menuItem('Események', '/events', false),
    new menuItem('Szerepjáték', '/', false),
    new menuItem('Magic Est', '/', false),
    new menuItem('Discord', discordUrl as string, true),
    new menuItem('A körről', '/about', false),
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container mx-auto px-2 lg:px-4">
      <Navbar
        isBordered
        shouldHideOnScroll
        isMenuOpen={isMenuOpen}
        classNames={{ wrapper: 'w-[990px] justify-between px-0' }}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} onClick={() => toggleMenu()} />
        </NavbarContent>
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
            <Link href="/events">Események</Link>
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
            <Link href={discordUrl} showAnchorIcon isExternal>
              <p className="flex flex-row items-center">Discord</p>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/about">A körről</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="w-full"
                href={item.link as string}
                size="lg"
                isExternal={item.isExternal}
                showAnchorIcon={item.isExternal}
                onClick={() => toggleMenu()}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
