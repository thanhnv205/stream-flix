import { IconProps } from '@/types'

const BurgerIcon: React.FC<IconProps> = ({ width = 24, height = 17, fill = '#dedede' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="1" width="18" height="2" rx="1" fill={fill} />
      <rect x="0" y="8" width="18" height="2" rx="1" fill={fill} />
      <rect x="0" y="15" width="18" height="2" rx="1" fill={fill} />
    </svg>
  )
}

export default BurgerIcon