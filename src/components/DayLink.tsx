import React from "react"
import { Link } from 'react-router-dom';

interface DayLinkProps {
    date_string: string
    day: Number
}

const DayLink: React.FC<DayLinkProps> = props => {
    let { date_string, day } = props
    return (
        <Link to={`day/${date_string}`} >
            {day}
        </Link>
    )
}

export default DayLink
