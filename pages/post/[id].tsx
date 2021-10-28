import { useEffect } from 'react'
import { useRouter } from 'next/router'

const index = () => {

    const router = useRouter()

    useEffect(() => {
        const { id } = router.query
        console.log(id)
    }, [router.query.id]);

    return (
        <div>
            
        </div>
    )
}

export default index
