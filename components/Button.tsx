import React from 'react'

interface ButtonProps {
    text: string,
    onClick?: () => void
    disabled?: boolean
}

const Button = ({text, onClick, disabled}: ButtonProps) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`w-60 h-10 ${disabled ? 'bg-gray-400':'bg-blue-600'} ${disabled ? 'cursor-default':'cursor-pointer'}  text-white font-bold rounded-2xl`} >
            {text}
        </button>
    )
}

export default Button
