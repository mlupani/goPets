import { cardProps } from 'interfaces/index'

const Card = ({id,title, description, img, fecha}: cardProps) => {

    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. A ducimus eligendi nostrum quasi cumque voluptatibus, provident nemo amet. Est, eius praesentium. Obcaecati esse non cupiditate ad libero quo facere tempore!"

    return (
        <div key={id} className='w-full flex flex-col border-b-2 border-gray-100 pb-8 '>
            <img alt={'imagen del post'} src={img}></img>
            <div className='px-2 pt-2'>
                <p className='text-xl mb-5' >{title}</p>
                <p className='text-md mb-2' >{description}</p>
                <p className='text-sm text-gray-400' >{fecha}</p>
            </div>
        </div>
    )
}

export default Card
