'use client'
import { Switch } from '@nextui-org/switch'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import useTheme from "../hooks/useTheme"
import Image from 'next/image'

type Props = {
  variant?: 'simple' | 'images',
  className?: string
}

function ThemeToggle({variant='simple', className}: Props) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return variant === 'simple' ? (
    <Switch
      defaultSelected
      size="sm"
      color={!isDark ? "default": 'warning'}
      isSelected={isDark}
      startContent={<MoonIcon />}
      endContent={<SunIcon />}
      onChange={toggleTheme}
    />
  ) : (
    <div
      className={`p-[4px] w-[53px] flex items-center justify-between dark:bg-bg_main bg-bg_main_dark rounded-full cursor-pointer ${className}`}
      onClick={toggleTheme}
    >
      <div className="relative w-full flex items-center justify-between">
        <Image src={'/moon.png'} alt='moon' width={20} height={20} />
        <div className={`absolute z-10 ${!isDark ? 'left-0' : 'left-[57%]'} top-0 w-[20px] h-[20px] bg-bg_main dark:bg-bg_main_dark rounded-full transition-all duration-300`}></div>
        <Image src={'/sun.png'} alt='sun' width={20} height={20} />
      </div>
    </div>
  )
}
export default ThemeToggle