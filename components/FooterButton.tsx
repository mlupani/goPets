import Link from 'next/link'
import Icons from 'components/Icons';
import { MouseEventHandler } from 'react';

interface footerButtonProps {
    title: string,
    icon: string,
    page: string,
    selected?: boolean
    onClick?: () => void
}

const FooterButton = ({title, icon, page, selected = false, onClick}: footerButtonProps) => {
    return (
        <div onClick={onClick} className={`flex flex-col text-center ${selected ? 'bg-red-500':'bg-red-700'}  border-white text-white text-sm justify-center items-center cursor-pointer `}>
            <Link href={page} >
                <div className='flex flex-col text-center items-center'>
                    <Icons iconName={icon} />
                    {title}
                </div>
            </Link>
        </div>
    )
}

export default FooterButton
