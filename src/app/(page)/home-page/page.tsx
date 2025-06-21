import { moviesTrend } from '@/apis'
import { Sidebar } from '@/app/components/layouts'
import { CustomSlick } from '@/app/components/customize'
import { SectionHeading } from '@/app/components/base'
import DisplayMovies from './components/DisplayMovies'
import Toolbar from './components/Toolbar'
import { Suspense } from 'react'


const HomePage = () => {
  return (
    <div className='font-[family-name:var(--font-geist-sans) mb-10'>
      <section className='max-w-[1920px] mx-auto'>
        <div className="relative bg-[url(/movies/bg-main.jpg)] bg-cover bg-center bg-no-repeat w-full h-[780px] after:content[''] after:absolute after:inset-0 after:bg-black/80 flex items-end">

          <div className='relative z-10 container px-10 md:px-20 py-5 backdrop-blur-xl bg-white/10 rounded-tl-[100px] rounded-br-[100px] mb-10'>
            <SectionHeading
              title="Phim Mới, Phim Hay Đỉnh Cao!"
              size='40px'
              highlight
              color='#fff'
            />
            <div className='w-full'>
              <CustomSlick
                data={moviesTrend}
                autoplay={true}
                slidesToShow={4}
              />
            </div>
          </div>
        </div >
      </section >

      <div className='container'>
        <Suspense>
          <Toolbar />
        </Suspense>

        <div className='flex flex-col md:flex-row gap-10 mt-5 relative'>
          <div className="flex-1 overflow-hidden">
            <Suspense>
              <DisplayMovies />
            </Suspense>
          </div>
          <Sidebar />
        </div>
      </div>
    </div >
  )
}

export default HomePage