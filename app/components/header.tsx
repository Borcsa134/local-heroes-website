'use client';
import { Link, Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/react';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import React from 'react';

import lhLogo from '../../public/lh-logo.svg';
import { ThemeSwitcher } from './themeSwitcher';

class menuItem {
  constructor(
    public name: string,
    public link: string,
    public isExternal: boolean,
  ) {}
}

interface Props {
  session: Session | null;
}

export default function Header({ session }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    new menuItem('Kezdőlap', '/', false),
    new menuItem('Hírek', '/news', false),
    new menuItem('Események', '/events', false),
    new menuItem('Szerepjáték', '/rpg', false),
    new menuItem('Magic Est', '/mtg', false),
    new menuItem('A körről', '/about', false),
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container mx-auto px-4 lg:w-[990px]">
      <Navbar isBordered shouldHideOnScroll isMenuOpen={isMenuOpen} classNames={{ wrapper: 'justify-between px-0' }}>
        <NavbarContent className="sm:hidden">
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} onClick={() => toggleMenu()} />
        </NavbarContent>
        <NavbarContent className="hidden gap-4 sm:flex sm:leading-[4rem] " justify="center">
          <NavbarItem>
            <Link href="/">
              <svg width={55} height={55}>
                <use href={`${lhLogo}#logo`} fill="gray" />
              </svg>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/news" className="text-sm md:text-base">
              Hírek
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/events" className="text-sm md:text-base">
              Események
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/rpg" className="text-sm md:text-base">
              Szerepjáték
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/mtg" className="text-sm md:text-base">
              Magic Est
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex sm:leading-[4rem]" justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>
            <Link href="/profile" className="text-sm md:text-base">
              Profil
            </Link>
          </NavbarItem>
          <NavbarItem>
            {!session?.user ? (
              <button className="text-sm md:text-base" onClick={() => signIn('discord', { redirectTo: '/profile' })}>
                Bejelentkezés
              </button>
            ) : (
              <button className="text-sm md:text-base" onClick={() => signOut({ redirectTo: '/' })}>
                Kijelentkezés
              </button>
            )}
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
