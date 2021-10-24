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
        <button className={`transition-all duration-100 ease-in-out transform hover:bg-gray-500 hover:border-b-2 hover:border-white flex flex-col text-center cursor-pointer  text-white text-sm justify-center items-center  ${selected && 'border-b-2 border-white'}   `}>
            <Link href={page} >
                <div className='flex flex-col text-center items-center'>
                    <Icons iconName={icon} />
                    <div className='md:hidden lg:flex'>{title}</div>
                </div>
            </Link>
        </button>
    )
}

export default HeaderButton
