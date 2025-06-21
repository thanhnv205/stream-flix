import { IMovie } from '@/types'


const Video = (data: IMovie) => {
  return (
    <div className="aspect-video w-full mx-auto overflow-hidden shadow-2xl">
      <video
        className="w-full h-full object-contain bg-black"
        controls
        preload="metadata"
        poster={data.poster}
      >
        <source src={data.poster} type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>

    </div>
  )
}

export default Video