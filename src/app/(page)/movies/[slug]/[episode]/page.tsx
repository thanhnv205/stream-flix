import { moviesLatest } from '@/apis'
import Link from 'next/link'
import Video from './components/Video'
import { SectionHeading } from '@/app/components/base'

const EpisodePage = async ({ params }: Readonly<{ params: Promise<{ slug: string, episode: string }> }>) => {
  const { slug, episode } = await params

  const data = moviesLatest.find(({ slug: slugMoive }) => slugMoive === slug)
  const acitve = episode.split('-')


  if (!data) {
    return (
      <>Not found</>
    )
  }

  return (
    <div className='pt-15 md:pt-30 container'>
      <div className="text-sm text-[var(--color-primary)]/80 mb-5">
        <nav className="flex items-center space-x-2 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:underline hover:text-[var(--color-primary)] transition-colors">Xem Phim</Link>
          <span>/</span>
          <Link href="/movies" className="hover:underline hover:text-[var(--color-primary)] transition-colors">Phim Bộ</Link>
          <span>/</span>
          <span className="text-[var(--color-primary)] font-medium">{data.title} - Tập {acitve[1]}</span>
        </nav>
      </div>


      <Video {...data} />

      <div className="my-10">
        <SectionHeading
          title={`${data.title} - Tập ${acitve[1]}`}
          size='20px'
          align='start'
          justify='start'
        />
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {[...Array(data.total_episodes)].map((_, i) => {
            const episode = i + 1
            const isActive = parseInt(acitve[1]) === episode
            const isLast = episode === data.total_episodes

            return (
              <Link
                key={episode}
                href={`/movies/${data.slug}/tap-${episode}`}
                className={`text-sm font-medium text-center px-2 md:px-4 py-2 rounded-lg border transition-all duration-200 ${isActive
                  ? 'bg-[#c58560] text-black border-[#c58560] shadow-lg'
                  : 'text-[var(--color-primary)] border-[var(--border-secondary)]/20 hover:bg-white/10 hover:border-[var(--border-secondary)]/30'}
                `}
              >
                Tập {isLast ? 'cuối' : episode}
              </Link>
            )
          })}

        </div>
      </div>

    </div>
  )
}

export default EpisodePage