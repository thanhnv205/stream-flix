'use client'

import { useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import Link from 'next/link'

interface MovieItem {
  id: string | number
  slug: string
  title: string
  poster: string
  year: number
  rating: number
  description?: string
}

interface ICustomSlick {
  data: MovieItem[]
  slidesToShow?: number,
  autoplay?: boolean
  autoplaySpeed?: number
  pauseOnHover?: boolean
}

const CustomSlick = ({ data, slidesToShow = 4, autoplay = false, autoplaySpeed = 5000, pauseOnHover = true }: ICustomSlick) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const sliderRef = useRef<Slider | null>(null)

  const totalSlides = data.length

  const handleNext = () => sliderRef.current?.slickNext()
  const handlePrev = () => sliderRef.current?.slickPrev()

  const sliderSettings = {
    dots: false,
    infinite: false,
    initialSlide: 0,
    autoplay,
    autoplaySpeed,
    pauseOnHover,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, slidesToShow)
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '50px'
        }
      }
    ]
  } as Settings

  const [flippedId, setFlippedId] = useState<string | number | null>(null)

  const handleFlip = (id: string | number) => {
    if (id === flippedId) return
    setFlippedId(prev => (prev === id ? null : id))
  }

  return (
    <div className="relative py-6 rounded-lg -mx-4">
      {/* Prev Arrow */}
      {currentSlide > 0 && (
        <button
          onClick={handlePrev}
          className="absolute hidden md:block left-[15px] top-1/2 -translate-y-1/2 z-10
            bg-black/90 hover:bg-black/80 text-white px-2 py-12 rounded-2xl
            shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <svg className="w-4 h-5" fill="none" stroke="currentColor" strokeWidth="5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next Arrow */}
      {currentSlide < totalSlides - slidesToShow && (
        <button
          onClick={handleNext}
          className="absolute hidden md:block right-[15px] top-1/2 -translate-y-1/2 z-10
           bg-black/90 hover:bg-black/80 text-white px-2 py-12 rounded-2xl
            shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <svg className="w-4 h-5" fill="none" stroke="currentColor" strokeWidth="5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <Slider ref={sliderRef} {...sliderSettings}>
        {data.map(({ id, slug, title, poster, year, rating, description }) => {
          const isFlipped = flippedId === id

          return (
            <div
              key={id}
              className="group px-4 transition-transform duration-300 cursor-pointer"
              onClick={() => handleFlip(id)}
            >
              <div className="relative w-full h-[390px] perspective rounded-xl overflow-hidden">
                <div className={`relative w-full h-full transform-style preserve-3d transition-transform duration-700
                  ${isFlipped ? 'rotate-y-180' : 'group-hover:rotate-y-180'}`}
                >
                  <div className="absolute inset-0 backface-hidden">
                    <Image
                      src={poster}
                      alt={title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-full object-cover"
                    />
                    <div className="flex flex-col items-center gap-0.5 absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-black/50 px-5 py-2 text-white ">
                      <h4 className="font-semibold truncate text-[15px]">{title}</h4>
                      <p className="text-md text-white/70">{year} ・ ⭐ {rating}</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    style={{ background: `url(${poster}) no-repeat center center /cover` }}
                    className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl text-white before:content-[''] before:absolute before:inset-0 before:bg-black/80 before:backdrop-blur-[2px] before:rounded-xl"
                  >
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-around p-2 md:p-5">
                      <div className="flex flex-col items-center gap-3">
                        <h3 className="text-lg font-bold uppercase text-center">{title}</h3>
                        {description && (
                          <p className="text-white/90 text-center line-clamp-4 px-3">{description}</p>
                        )}
                      </div>

                      <div className="flex gap-4 mt-2">
                        <Link href={`movies/${slug}`}
                          className="flex items-center gap-1 px-5 py-1.5 border border-white/50 bg-white/10 backdrop-blur-sm
                        text-white text-sm rounded-full hover:bg-white/20 transition"
                        >
                          Thông tin
                        </Link>

                        <Link
                          href={`movies/${slug}/tap-1`}
                          className="flex items-center gap-1 px-5 py-1.5 border border-pink-500 bg-pink-500/10
                          text-pink-400 rounded-full hover:bg-pink-600/30 transition"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 4l10 6-10 6V4z" />
                          </svg>
                          Phát
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </Slider >
    </div >
  )
}

export default CustomSlick