'use client';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = React.useState(loadTheme());

  useEffect(() => {
    setUserTheme(isSelected ? 'dark' : 'light');
  }, [isSelected]);

  function loadTheme() {
    const theme = localStorage.getItem('theme');
    return theme === 'light' ? false : true;
  }

  function setUserTheme(newTheme: string) {
    const theme = localStorage.getItem('theme');
    if (theme && theme != newTheme) {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
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
