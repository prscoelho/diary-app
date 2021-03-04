import React from 'react'

interface HeaderProps {
    link?: JSX.Element
    side: "left" | "right" | "none"
    name: string
}

const Header: React.FC<HeaderProps> = props => {
    return (
        <div className="grid grid-cols-12 py-8">
            {props.side === "left" ? props.link : <div></div>}
            <div className="text-center col-span-10 text-gray-500 text-1xl font-semibold">{props.name}</div>
            {props.side === "right" ? props.link : null}
        </div>
    )
}

export default Header
