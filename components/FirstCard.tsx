import { cardProps } from 'interfaces/index'

const FirstCard = ({id,title, img, fecha}: cardProps) => {
    return (
        <div key={id} className='flex flex-col'>
            <img className='w-full h-36 object-cover' src={img} alt={'Mascota en adopcion'} ></img>
            <h1 className='text-xl'>{title}</h1>
            <p className='text-lg text-gray-500'>{fecha}</p>
        </div>
    )
}

export default FirstCard
