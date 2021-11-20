import { useRouter } from 'next/router'
import { cardProps } from 'interfaces/index'
import useTimeAgo from 'hooks/useTimeAgo'

const Card = ({id,title, img, fecha, description, avatar, userName}: cardProps) => {

    const router = useRouter()
    const timeAgo = useTimeAgo(fecha)

    return (
        <div onClick={() => router.push("/post/[id]", `/post/${id}`, {shallow: true})} className='w-full flex flex-col border-b-2 border-blue-cyanProcess pb-8 cursor-pointer '>
            <div className='flex flex-row justify-start items-center ml-2 mb-2'>
                <img referrerPolicy="no-referrer" className='w-9 h-w-9 rounded-full mr-4' src={avatar} alt='avatar'/>
                <div className='flex flex-col'>
                    <p className='text-base'>{userName}</p>
                    <p className='text-sm text-gray-400'>{timeAgo}</p>
                </div>
            </div>
            <img alt={'imagen del post'} src={img}></img>
            <div className='px-2 pt-2'>
                <p className='text-xl mb-5' >{title}</p>
                <p className='text-md mb-2' >{description}</p>
            </div>
        </div>
    )
}

export default Card
