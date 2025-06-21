'use client'

import Link from 'next/link'
import { moviesTops } from '@/apis'
import { SectionHeading } from '../base'

const Sidebar = () => {
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="w-full md:w-fit shrink-0 h-fit sticky top-24"
      aria-label="Sidebar"
    >
      <div className="h-full py-4 overflow-y-auto">
        <SectionHeading
          title="Top Trending"
          highlight
          size="20px"
          align="start"
          justify="start"
        />

        <ul className="list">
          {moviesTops.map((menu, index) => (
            <li key={index} className='last:[&>a]:border-none'>
              <Link
                href={`/movies/${menu.slug}`}
                className='flex gap-4 items-center py-2 text-[var(--color-meta)] border-b border-[var(--border-primary)]'
              >
                <span className='bg-[#da966e] w-6.5 h-6.5 rounded-full flex items-center justify-center text-[15px]'>
                  {index + 1}
                </span>
                <div className='flex flex-col'>
                  <span className="whitespace-nowrap text-[15px] hover:text-[#da966e] font-semibold duration-300">
                    {menu.title}
                  </span>

                  <span className='text-[13px] font-medium text-[var(--color-meta)]/80 italic'>
                    {menu.views} lượt xem
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar