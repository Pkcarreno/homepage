import React, { useEffect, useState } from 'react'
import { IoSunny, IoMoon } from 'react-icons/io5'

const themes = ['light', 'dark']

export default function ThemeToggler() {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })
  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', t)
    setTheme(t)
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', '#140f00')
    } else {
      root.classList.add('dark')
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', '#fff5d6')
    }
  }, [theme])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? (
    <div className="inline-flex items-center p-[1px]">
      <button
        className={`bg-purple-800 text-[#f0f0f0] dark:bg-amber-300 dark:text-[#1c1917] cursor-pointer rounded-2xl p-2`}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <IoMoon /> : <IoSunny />}
      </button>
    </div>
  ) : (
    <div />
  )
}
