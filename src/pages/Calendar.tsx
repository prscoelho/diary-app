import React, { useState } from "react"

import { generate, dateToLink } from "../utils"

import format from "date-fns/format"
import { subMonths, addMonths } from "date-fns"


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
            <div className="calendar-header">
                <button onClick={prevMonth}>l</button>
                {format(month, "LLLL u")}
                <button onClick={nextMonth}>r</button>
            </div>
            <div className="calendar-content">
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
