import { createContext, ReactNode, useEffect } from 'react';
import { Theme } from 'src/constant/Theme';

const ThemeContext = createContext({});

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', Theme.LIGHT);
  }, []);

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
