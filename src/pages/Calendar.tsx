import React, { useState } from "react"
import { subMonths, addMonths, format } from "date-fns"

import { generate, dateToLink } from "../utils"
import DayLink from '../components/DayLink'

const Calendar: React.FC = () => {
    const [month, setMonth] = useState(() => new Date(Date.now()))

    const calendarList = generate(month)

    const nextMonth = () => {
        setMonth(curr => addMonths(curr, 1))
    }
    const prevMonth = () => {
        setMonth(curr => subMonths(curr, 1))
    }

    return (
        <>
            <div>
                <button onClick={prevMonth}>l</button>
                {format(month, "LLLL y")}
                <button onClick={nextMonth}>r</button>
            </div>
            <div>
                {calendarList.map(day => {
                    let date_string = dateToLink(day)
                    return (
                        <DayLink
                            key={date_string}
                            day={day.getDate()}
                            date_string={date_string}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Calendar
