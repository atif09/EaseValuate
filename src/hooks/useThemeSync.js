import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export function useThemeSync() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
}