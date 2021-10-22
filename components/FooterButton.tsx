import Link from 'next/link'
import Icons from 'components/Icons';

interface footerButtonProps {
    title: string,
    icon: string,
    page: string,
    selected?: boolean
}

const FooterButton = ({title, icon, page, selected = false}: footerButtonProps) => {
    return (
        <div className={`flex flex-col text-center ${selected ? 'bg-red-500':'bg-red-700'}  border-white text-white text-sm justify-center items-center  `}>
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
