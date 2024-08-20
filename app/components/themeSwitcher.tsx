'use client';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = React.useState(true);

  useEffect(() => {
    setMounted(true);
    setIsSelected(loadTheme());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setUserTheme(isSelected ? 'dark' : 'light');
  });

  function loadTheme() {
    const theme = localStorage.getItem('theme');
    return theme === 'light' ? false : true;
  }

  function setUserTheme(newTheme: string) {
    if (newTheme == theme) return;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return (
    <div>
      <Switch
        isSelected={isSelected}
        onValueChange={setIsSelected}
        startContent={<FontAwesomeIcon icon={faMoon} />}
        endContent={<FontAwesomeIcon icon={faSun} />}
      ></Switch>
    </div>
  );
}
