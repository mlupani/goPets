import React from 'react'
import Link from 'next/link';
import Icons from 'components/Icons';

interface headerButtonProps {
    title: string,
    icon: string,
    page: string,
    selected?: boolean
}

const HeaderButton = ({title, icon, page, selected = false}: headerButtonProps) => {
    return (
        <div title={title} className={`flex flex-col text-center ${selected && 'border-b-2 md:pb-1'} cursor-pointer  border-white text-white text-sm justify-center items-center  `}>
            <Link href={page} >
                <div className='flex flex-col text-center items-center'>
                    <Icons iconName={icon} />
                    <div className='md:hidden lg:flex'>{title}</div>
                </div>
            </Link>
        </div>
    )
}

export default HeaderButton
