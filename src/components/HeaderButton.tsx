import React from 'react'
import { Link } from 'react-router-dom'

interface HBProps {
    to: string
    text: string
}

const HeaderButton: React.FC<HBProps> = props => {
    return (
        <Link to={props.to} className="hover:bg-gray-100 w-8 text-center rounded text-1xl font-semibold">{props.text}</Link>
    )
}

export default HeaderButton