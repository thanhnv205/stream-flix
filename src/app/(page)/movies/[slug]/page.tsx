import Details from './components/Details'

const MovieDetailPage = async ({ params }: Readonly<{ params: Promise<{ slug: string }> }>) => {
  const { slug } = await params
  return <Details params={slug} />
}

export default MovieDetailPage