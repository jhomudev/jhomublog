import {useTheme as useThemeNextThemes} from "next-themes";

function useTheme() {
  const { theme, setTheme, themes } = useThemeNextThemes()

  const toggleTheme = () => { setTheme(theme === 'light' ? 'dark' : 'light') }

  return {theme, toggleTheme, setTheme, themes}
}

export default useTheme