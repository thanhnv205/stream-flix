'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { BurgerIcon, DarkIcon, LightIcon } from '../icons'

const Header = () => {
  const [isFixed, setIsFixed] = useState<boolean>(false)
  const [toggleMenu, setToggleMenu] = useState<boolean>(false)

  // Theme mode
  const { resolvedTheme, setTheme } = useTheme()

  const handleOpenMenu = () => {
    setToggleMenu((prev) => !prev)
  }

  const handleCloseMenu = () => {
    setToggleMenu((prev) => !prev)
  }


  useEffect(() => {
    // if (window.screen.width < 768) return
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0 ? true : false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="relative md:absolute w-full z-50">
      <div className="md:block hidden">
        <div className={`${isFixed
          ? 'fixed w-full left-0 top-0 py-5 bg-[var(--bg-header)]/70 backdrop-blur-lg shadow-[0_0_15px_rgba(255,46,99,0.5),0_0_25px_rgba(0,221,235,0.3)] z-50 border-b-1 border-image-[linear-gradient(to_right,#ff2e63,#00ddeb,#ff2e63)]' : 'py-[20px] bg-[var(--bg-header)]/10'} px-5 transition-all duration-500 ease-in-out`}
        >
          <div className="container">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href='/'
                className={`flex items-center justify-center font-bold transition-all duration-300 ease-in-out
                  ${isFixed ? 'text-2xl' : 'text-3xl'}`}
              >
                StreamFlix
              </Link>

              <div className="flex gap-[20px] items-center">
                <nav className="flex items-center space-x-5 lg:space-x-7.5 uppercase font-medium">
                  <Link href='/' className="text-white">Trang chủ</Link>
                  <Link href='/' className="text-white">Thể loại</Link>
                  <Link href='/' className="text-white">Quốc gia</Link>
                  <Link href='/' className="text-white">Phim bộ</Link>
                  <Link href='/' className="text-white">Phim lẻ</Link>
                </nav>

                <label className="relative inline-block w-[55px] h-7 cursor-pointer select-none ml-4">
                  <input
                    type="checkbox"
                    checked={resolvedTheme === 'dark'}
                    onChange={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="sr-only peer"
                  />

                  <div className='absolute inset-0 rounded-full bg-neutral-700 dark:bg-[#da966e]
                      flex items-center justify-between px-2 transition-colors duration-300'>
                    <DarkIcon />
                    <LightIcon />
                  </div>

                  <div className='absolute top-1 left-1 w-5 h-5 rounded-full bg-white dark:bg-gray-300 shadow-md
                      transition-transform duration-300 peer-checked:translate-x-6.5' />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`block md:hidden ${isFixed ? 'fixed w-full left-0 top-0 py-5 bg-[#241b40]/80 backdrop-blur-md shadow-[0_0_10px_#ff2e63,0_0_20px_#00ddeb] z-50 transition-all duration-300' : 'py-[30px] bg-[#2a1e3b]/80'}`} >
        <div className="grid grid-cols-12 gap-4 items-center px-[30px]">
          <div className="col-span-3">
            <button className="flex items-center justify-center" onClick={handleOpenMenu}>
              <BurgerIcon />
            </button>
          </div>


          <div className="col-span-6">
            <Link href='/' className="flex items-center justify-center text-3xl font-bold">
              StreamFlix
            </Link>
          </div>

          <div className="col-span-3">
            <div className="flex items-center space-x-3 justify-end">
              <button className="border border-[#dedede] w-[30px] h-[30px] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="7" r="5" stroke="#dedede" strokeWidth="2" />
                  <path d="M4 21C4 17 8 14 12 14C16 14 20 17 20 21" stroke="#dedede" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>


        {/* Toggle menu */}
        <div
          className={`fixed inset-0 h-screen bg-[#1c1524]/80 backdrop-blur-md w-[65vw] z-50 border-r border-[#4b2a6b] transition-transform duration-300 ease-in-out ${toggleMenu ? 'translate-x-[0]' : 'translate-x-[-130%]'}`}
        >
          <div className="flex items-center bg-[#2a1e3b]/90 px-5 py-5 shadow-[0_0_5px_rgba(184,51,255,0.5)]">
            <button onClick={handleCloseMenu} className="absolute z-10 w-6 h-6 flex">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 17L17 6M6 6L17 17"
                  stroke="#ff4d5e"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <Link href="/" className="flex-1 flex justify-center text-2xl">
              StreamFlix
            </Link>

            <label className="relative inline-block w-[55px] h-7 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={resolvedTheme === 'dark'}
                onChange={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="sr-only peer"
              />

              <div className='absolute inset-0 rounded-full bg-neutral-700 dark:bg-[#da966e]
                  flex items-center justify-between px-2 transition-colors duration-300'
              >
                <DarkIcon />
                <LightIcon />
              </div>

              <div className='absolute top-1 left-1 w-5 h-5 rounded-full bg-white dark:bg-gray-300 shadow-md
                  transition-transform duration-300 peer-checked:translate-x-6.5' />
            </label>
          </div>

          <nav className="flex flex-col justify-center space-y-3 mt-5 ml-5 text-white">
            <Link href="/" className="text-[14px] hover:text-[#f7c948] transition-colors duration-200">
              Trang chủ
            </Link>
            <Link href="/" className="text-[14px] hover:text-[#f7c948] transition-colors duration-200">
              Thể loại
            </Link>
            <Link href="/" className="text-[14px] hover:text-[#f7c948] transition-colors duration-200">
              Quốc gia
            </Link>
            <Link href="/" className="text-[14px] hover:text-[#f7c948] transition-colors duration-200">
              Phim bộ
            </Link>
            <Link href="/" className="text-[14px] hover:text-[#f7c948] transition-colors duration-200">
              Phim lẽ
            </Link>
          </nav>
        </div>

        <div className={`fixed inset-0 bg-[#00000099] z-30 ${!toggleMenu && 'hidden'}`} onClick={handleCloseMenu}></div>
      </div>
    </header>
  )

}

export default Header
