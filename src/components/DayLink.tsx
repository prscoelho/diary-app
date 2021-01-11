import React from "react"
import { Link } from 'react-router-dom';

interface DayLinkProps {
    color: "selected" | "greyed" | "normal"
    date_string: string
    day: Number
}

const DayLink: React.FC<DayLinkProps> = props => {
    let { color, date_string, day } = props
    return (
        <Link to={`day/${date_string}`} className={color}>
            {day}
        </Link>
    )
}

export default DayLink
