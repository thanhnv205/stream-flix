
import Link from 'next/link'
import Image from 'next/image'

import { moviesLatest } from '@/apis'
import { SectionHeading } from '@/app/components/base'


const MovieDetailPage = ({ params }: { params: string }) => {
  const movie = moviesLatest.find(({ slug }) => slug === params)

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Không tìm thấy phim
      </div>
    )
  }


  return (
    <div className="relative min-h-screen w-full text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={movie.poster}
          alt={movie.title}
          width={0}
          height={0}
          sizes='100vw'
          className="w-full h-full object-cover blur-lg scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      <div className='container mx-auto pt-20 md:pt-44 pb-20 flex flex-col gap-20'>
        <div className='flex flex-col md:flex-row gap-10 md:gap-20'>
          <div className="relative group w-full md:w-[320px] h-[400px] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.15)]">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={0}
              height={0}
              sizes='100vw'
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Link
                href={`/movies/${params}/tap-1`}
                className="bg-white/20 hover:bg-white/30 p-4 rounded-full"
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 4l10 6-10 6V4z" />
                </svg>
              </Link>
            </div>
          </div>


          <div className="flex-1">
            <h1 className="text-md lg:text-3xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-md">
              {movie.title}
            </h1>
            <div className="text-sm text-gray-300 mb-6 flex items-center gap-4">
              <span className="bg-white/10 px-3 py-1 rounded-full text-white/80">
                {movie.year}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-white/80">
                ⭐ {movie.rating}
              </span>
              <span className="bg-pink-600 px-3 py-1 rounded-full text-sm font-bold">
                HD
              </span>
            </div>

            <ul className="text-[15px] text-gray-200 leading-relaxed mb-8 max-w-2xl">
              <li>Trạng thái: Hoàn Tất (20/20) Vietsub</li>
              <li>Đạo diễn:  Đang cập nhật...</li>
              <li>Thời lượng:  16 phút/tập</li>
              <li>Số tập:   20</li>
              <li>Tình trạng:  Hoàn thành</li>
              <li>Ngôn ngữ:  Vietsub</li>
              <li>Năm sản xuất:  2025</li>
              <li>Quốc gia:  Trung Quốc</li>
              <li>Thể loại: Chính kịch, Tâm Lý, Tình Cảm</li>
              <li>Diễn viên:  Ding Ran, Eva Shang, Jerry Tan, Li Ruotian, Lu Ming</li>
            </ul>


            <div className="flex gap-4">
              <Link className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 transition-all shadow-lg text-white font-semibold text-sm tracking-wide"
                href={`/movies/${params}/tap-1`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Xem phim
              </Link>

              <Link
                href="/"
                className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-all font-semibold text-sm tracking-wide shadow-lg"
              >
                <svg className="w-5 h-5 fill-current rotate-180" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Quay lại trang chủ
              </Link>
            </div>
          </div>
        </div>


        <div className="bg-white/5 backdrop-blur-sm border border-white/10 pt-2 p-8 rounded-2xl shadow-xl">
          <SectionHeading
            title={`Nội dung phim - ${movie.title}`}
            size='16px'
            align='start'
            justify='start'
            color='#fff'
          />

          <p className="text-gray-200/80 leading-relaxed text-[15px] mb-8">
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage
