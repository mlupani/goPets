import { useDispatch } from 'react-redux';
import useUser from 'hooks/useUser'
import Card from 'components/Card';
import data from 'data/data.json'

const index = () => {

    const user = useUser()
    const dispatch = useDispatch()

    return (
        <div className='container mx-auto flex flex-col justify-center items-center relative'>
            <div className='grid grid-cols-1 pb-24 gap-10 lg:pt-10 md:mx-44 lg:mx-56 xl:mx-96 mt-20 lg:mt-10'>
                {
                    data?.map(({id, title, img, fecha}) => <Card id={id} title={title} img={img} fecha={fecha} />)
                }
            </div>
        </div>
    )
}

export default index
