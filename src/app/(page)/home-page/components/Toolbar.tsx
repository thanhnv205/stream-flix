'use client'

import { useSearchQuery } from '@/hooks'
import { DeleteIcon, SearchIcon } from '@/app/components/icons'

const Toolbar = () => {
  const { query, setQuery } = useSearchQuery({ paramKey: 'movies-title', delay: 300 })
  const genre = useSearchQuery({ paramKey: 'genre' })
  const year = useSearchQuery({ paramKey: 'year' })
  const rating = useSearchQuery({ paramKey: 'rating' })

  const hasFilters = genre.query || year.query || rating.query || query

  const clearFilters = () => {
    setQuery('')
    genre.setQuery('')
    year.setQuery('')
    rating.setQuery('')
  }

  const filterData = {
    genre: [
      { value: '', label: 'Tất cả' },
      { value: 'action', label: 'Hành động' },
      { value: 'romance', label: 'Tình cảm' },
      { value: 'drama', label: 'Tâm lý' },
      { value: 'comedy', label: 'Hài' }
    ],
    rating: [
      { value: '', label: 'Tất cả' },
      { value: '9', label: '9+ ⭐' },
      { value: '8', label: '8+ ⭐' },
      { value: '7', label: '7+ ⭐' },
      { value: '6', label: '6+ ⭐' }
    ],
    year: [
      { value: '', label: 'Tất cả' },
      ...Array.from({ length: 10 }, (_, i) => {
        const y = 2025 - i
        return { value: String(y), label: String(y) }
      })
    ]
  }

  const renderSelect = (
    id: string,
    label: string,
    options: { value: string, label: string }[],
    value: string,
    // eslint-disable-next-line no-unused-vars
    onChange: (v: string) => void
  ) => (
    <div className='w-full flex flex-1 flex-col lg:flex-row items-center gap-3'>
      <label htmlFor={id} className="text-sm text-[var(--color-primary)]/70 whitespace-nowrap">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={({ target }) => onChange(target.value)}
        className="bg-[var(--bg-secondary)] border border-white/20 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition w-full"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className='flex flex-col lg:flex-row items-start md:items-center gap-3 lg:gap-10 mt-14 text-white'>
      <form className='relative w-full lg:w-[30%]'>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className='w-full bg-[var(--bg-secondary)] text-white border border-white/20 rounded-md px-5 py-3 pr-12 text-sm focus:outline-none placeholder-[var(--color-placeholder)]'
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
        <button
          type="reset"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
          onClick={() => query && setQuery('')}
        >
          {query.length ? <DeleteIcon /> : <SearchIcon />}
        </button>
      </form>

      <div className='flex flex-col items-end md:flex-row gap-10 w-full md:w-auto'>
        <div className='flex flex-wrap gap-5 items-center w-full justify-around'>
          {renderSelect('genre', 'Thể loại', filterData.genre, genre.query, genre.setQuery)}
          {renderSelect('year', 'Năm', filterData.year, year.query, year.setQuery)}
          {renderSelect('rating', 'Xếp hạng', filterData.rating, rating.query, rating.setQuery)}
        </div>


        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm px-4 py-2.5 rounded-md border border-pink-500 text-pink-400 bg-pink-500/10 hover:bg-pink-600/20 transition lg:ml-5 w-full lg:w-fit whitespace-nowrap"
          >
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Toolbar
