export interface IMovieTops {
  id: number
  title: string
  views?: number
  slug: string
}

export interface IMovie extends IMovieTops {
  year: number
  rating: number
  genre: string[]
  poster: string
  description: string
  views?: number
}