import React from "react"
import { Link } from 'react-router-dom';
import isToday from 'date-fns/isToday'

interface DayLinkProps {
    date_string: string
    day: Date
    same_month: boolean
}

const DayLink: React.FC<DayLinkProps> = props => {
    let { date_string, day, same_month } = props

    let tailwind_styles = [
        same_month ? "text-current" : "text-gray-300",
        isToday(day) ? "rounded bg-indigo-600 text-white" : "rounded hover:bg-indigo-600 hover:text-white",
        "w-10"
    ]

    return (
        <Link to={`day/${date_string}`} className={tailwind_styles.join(" ")} >
            {day.getDate()}
        </Link>
    )
}

export default DayLink
