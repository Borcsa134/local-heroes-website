'use client';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    const handleStorageChange = () => {
      const storedTheme = localStorage.getItem('theme');
      setIsSelected(storedTheme === 'light' ? false : true);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const newTheme = isSelected ? 'dark' : 'light';
    if (newTheme !== theme) {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  }, [isSelected, setTheme, theme]);

  if (!isMounted) return null;

  return (
    <div>
      <Switch
        isSelected={isSelected}
        onValueChange={setIsSelected}
        startContent={<FontAwesomeIcon icon={faMoon} />}
        endContent={<FontAwesomeIcon icon={faSun} />}
      />
    </div>
  );
}
