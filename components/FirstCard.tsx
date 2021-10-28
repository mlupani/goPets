import useTimeAgo from 'hooks/useTimeAgo'
import { cardProps } from 'interfaces/index'
import { useRouter } from 'next/router'

const FirstCard = ({id,title, img, fecha, description, avatar, userName}: cardProps) => {

    const router = useRouter()
    const timeAgo = useTimeAgo(fecha)

    return (
        <div onClick={() => router.push("/post/[id]", `/post/${id}`, {shallow: true})} className='flex flex-col'>
            <img className='w-full h-36 object-cover' src={img} alt={'Mascota en adopcion'} ></img>
            <h1 className='text-xl'>{title}</h1>
            <p className='text-lg text-gray-500'>{timeAgo}</p>
        </div>
    )
}

export default FirstCard
