import { FC, useMemo } from 'react'


type ISectionHeading = {
  title: string;
  size?: string;
  color?: string;
  highlight?: string | boolean;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
}


const SectionHeading: FC<ISectionHeading> = (props) => {

  const { title, highlight = '#d8b9ff', size = '36px', align = 'center', justify = 'center', color } = props


  const highlightColor = useMemo(() => {
    if (typeof highlight === 'boolean') {
      return '#ff5733'
    }
    return highlight
  }, [highlight])


  return (
    <div className="flex" style={{ justifyContent: justify }}>
      <div className="flex flex-col items-center mb-7 relative w-fit" style={{ alignItems: align }}>
        <h1 className='text-center mt-5 mb-1 text-[var(--color-primary)]' style={{ fontSize: size, color }}>{title}</h1>
        <div className="w-[60px] h-[2px]" style={{ backgroundColor: highlightColor }}></div>
      </div>
    </div>
  )
}

export default SectionHeading
