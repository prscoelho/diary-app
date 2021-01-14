import React, { useState } from "react"
import { subMonths, addMonths, format, isSameMonth } from "date-fns"

import { generate, dateToLink } from "../utils"
import CalendarButton from '../components/CalendarButton'

const Calendar: React.FC = () => {
    const [month, setMonth] = useState(() => new Date(Date.now()))

    const calendarList = generate(month)

    const nextMonth = () => {
        setMonth(curr => addMonths(curr, 1))
    }
    const prevMonth = () => {
        setMonth(curr => subMonths(curr, 1))
    }
    let days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    return (
        <div>
            <div className="text-center text-gray-500 text-1xl py-8 font-semibold">Calendar</div>
            <div className="grid grid-cols-7 gap-4 text-2xl font-bold pb-6">
                <button className="text-indigo-400 text-center w-10 hover:bg-gray-100 rounded" onClick={prevMonth}>&lt;</button>
                <span className="col-span-5 text-center">{format(month, "LLLL y")}</span>
                <button className="text-indigo-400 text-center w-10 hover:bg-gray-100 rounded" onClick={nextMonth}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-4 text-center">
                {days.map((day, idx) =>
                    <div key={`${day}-${idx}`} className="text-gray-500 w-10">{day}</div>
                )}
                {calendarList.map(day => {
                    let date_string = dateToLink(day)
                    return (
                        <CalendarButton
                            key={date_string}
                            same_month={isSameMonth(day, month)}
                            day={day}
                            date_string={date_string}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Calendar
