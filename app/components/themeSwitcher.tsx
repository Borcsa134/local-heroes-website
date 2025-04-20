'use client';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@heroui/react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

export function ThemeSwitcher() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  const { setTheme } = useTheme();
  const currentTheme = useRef('dark');

  useEffect(() => {
    setIsMounted(true);
    currentTheme.current = localStorage.getItem('theme') ?? 'dark';
    setIsSelected(currentTheme.current === 'light' ? false : true);

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
    if (!isMounted) return;

    const newTheme = isSelected ? 'dark' : 'light';
    if (newTheme !== currentTheme.current) {
      setTheme(newTheme);
      currentTheme.current = newTheme;
      localStorage.setItem('theme', newTheme);
    }
  }, [isSelected, setTheme, isMounted]);

  // if (!isMounted) return null;

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
