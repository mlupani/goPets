import FirstCard from 'components/FirstCard'
import data from 'data/data.json'

const index = () => {
    return (
        <div className='container mx-auto h-screen flex flex-col pt-12'>
            <div className='grid grid-cols-2 md:auto-cols-min md:grid-cols-6 lg:grid-cols-8 gap-2 mx-1 md:mt-10 pb-24'>
            {
                data?.map(({id, title, img, fecha}) => <FirstCard id={id} title={title} img={img} fecha={fecha} />)
            }
            </div>
        </div>
    )
}

export default index
