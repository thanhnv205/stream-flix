'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import { moviesLatest } from '@/apis'
import { SectionHeading } from '@/app/components/base'
import { useSearchParams } from 'next/navigation'

const DisplayMovies = () => {
  const searchParams = useSearchParams()

  const query = {
    title: searchParams.get('movies-title') ?? '',
    genre: searchParams.get('genre') ?? '',
    year: searchParams.get('year') ?? '',
    rating: searchParams.get('rating') ?? ''
  }

  // Loại bỏ dấu tiếng việt trong tìm kiếm
  const unmarkTitle = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
  }

  const filteredData = useMemo(() => {
    const normalizedQueryTitle = unmarkTitle(query.title.trim().toLowerCase())

    return moviesLatest.filter((movie) => {
      const normalizedMovieTitle = unmarkTitle(movie.title.toLowerCase())

      const matchTitle = normalizedMovieTitle.includes(normalizedQueryTitle)

      const matchGenre = query.genre
        ? movie.genre.some((g) => g.toLowerCase() === query.genre.toLowerCase())
        : true
      const matchYear = query.year ? String(movie.year) === query.year : true
      const matchRating = query.rating ? movie.rating >= Number(query.rating) : true
      return matchTitle && matchGenre && matchYear && matchRating
    })
  }, [query, moviesLatest])

  const [flippedId, setFlippedId] = useState<number | null>(null)

  const handleFlip = (id: number) => {
    if (id === flippedId) return
    setFlippedId(prev => (prev === id ? null : id))
  }

  return (
    <>
      <SectionHeading
        title={`${query.title.length ? `Tìm kiếm: ${query.title}` : 'Phim mới cập nhật'}`}
        highlight
        size="28px"
        align="start"
        justify="start"
      />

      {filteredData.length ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-6">
          {filteredData.map(({ id, slug, title, poster, year, rating, description }) => {
            const isFlipped = flippedId === id

            return (
              <div key={id}
                className="group relative transition-transform duration-300 cursor-pointer"
                onClick={() => handleFlip(id)}
              >
                <div className="relative w-full h-[320px] perspective rounded-xl overflow-hidden">
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
                      <div className="flex flex-col items-center gap-0.5 absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-black/50 px-5 py-2 text-white">
                        <h4 className="font-semibold truncate text-[15px]">{title}</h4>
                        <p className="text-md text-white/70">
                          {year} ・ ⭐ {rating}
                        </p>
                      </div>
                    </div>

                    <div
                      style={{ background: `url(${poster}) no-repeat center center / cover` }}
                      className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl text-white before:content-[''] before:absolute before:inset-0 before:bg-black/80 before:backdrop-blur-[2px] before:rounded-xl"
                    >
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-around py-5">
                        <div className="flex flex-col items-center gap-3 px-4">
                          <h3 className="text-lg font-bold uppercase text-center">{title}</h3>
                          {description && (
                            <p className="text-white/90 text-center line-clamp-4">{description}</p>
                          )}
                        </div>

                        <div className="flex gap-3 mt-2">
                          <Link
                            href={`/movies/${slug}`}
                            className="flex items-center gap-1 px-4 py-1.5 border border-white/50 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full hover:bg-white/20 transition"
                          >
                            Thông tin
                          </Link>

                          <Link
                            href={`/movies/${slug}/tap-1`}
                            className="flex items-center gap-1 px-4 py-1.5 border border-pink-500 bg-pink-500/10 text-pink-400 rounded-full hover:bg-pink-600/30 transition"
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
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-xl mt-4">
          <p className="text-gray-200/80 leading-relaxed text-[16px] text-center">
            No results found !!!
          </p>
        </div>
      )}
    </>
  )
}

export default DisplayMovies