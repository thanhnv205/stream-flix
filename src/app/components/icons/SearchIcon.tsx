import { IconProps } from '@/types'

const SearchIcon: React.FC<IconProps> = ({ width = 20, height = 20, fill = '#fff' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 15L17 17" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="6" stroke={fill} strokeWidth="2" />
    </svg>
  )
}

export default SearchIcon