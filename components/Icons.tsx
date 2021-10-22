import React from 'react'

interface iconProps {
    iconName: string
}

const Icons = ({iconName}: iconProps) => {

    if(!iconName) return <></>

    if(iconName === 'heart')
        return (
            <img className="h-6 w-6" src="https://img.icons8.com/ios-glyphs/30/ffffff/dog-paw-print.png"/>
        )
    if(iconName === 'dog')
        return (
            <img className="h-6 w-6" src="https://img.icons8.com/fluency-systems-filled/48/ffffff/dog-footprint.png"/>
        )
    if(iconName === 'house')
        return (
            <img className="h-6 w-6" src="https://img.icons8.com/material-rounded/24/ffffff/dog-house.png"/>
        )
    if(iconName === 'search')
        return (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50" style={{fill:"white"}}><path d="M34.8 32c-.9 1-1.9 1.9-2.9 2.7l11.7 11.7 2.8-2.8L34.8 32zM20.5 2.5A17 17 0 1020.5 36.5 17 17 0 1020.5 2.5z"></path></svg>
        )
    if(iconName === 'user')
        return (
            <img className="h-6 w-6" src="https://img.icons8.com/ios-glyphs/30/ffffff/user--v1.png"/>
        )

    return <></>
}

export default Icons
