import React, { useState, useEffect } from "react"

import { generate, dateToLink, linkToDate } from "../utils"

import format from "date-fns/format"
import { useParams } from "react-router-dom"
import { subMonths, addMonths, isSameDay } from "date-fns"

import { ParamTypes } from "../types"

import DayLink from '../components/DayLink'

const Calendar: React.FC = () => {
    const { date } = useParams<ParamTypes>()
    const [selected, select] = useState(
        date ? linkToDate(date) : new Date(Date.now())
    )
    const [month, setMonth] = useState(selected)

    useEffect(() => {
        const sel = date ? linkToDate(date) : new Date(Date.now())
        select(sel)
        setMonth(sel)
    }, [date])

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
                    let color
                    if (day.getMonth() !== month.getMonth()) {
                        color = "greyed" as const
                    } else if (isSameDay(selected, day)) {
                        color = "selected" as const
                    } else {
                        color = "normal" as const
                    }
                    return (
                        <DayLink
                            key={date_string}
                            day={day.getDate()}
                            color={color}
                            date_string={date_string}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Calendar
