import React, { useState } from "react"
import { subMonths, addMonths, format, isSameMonth } from "date-fns"

import { generate, dateToLink } from "../utils"
import CalendarButton from '../components/CalendarButton'
import RecentList from "../components/RecentList"
import Header from "../components/Header"

const Calendar: React.FC = () => {
    const [month, setMonth] = useState(() => new Date(Date.now()))

    const calendarList = generate(month)

    const nextMonth = () => {
        setMonth(curr => addMonths(curr, 1))
    }

    const prevMonth = () => {
        setMonth(curr => subMonths(curr, 1))
    }

    let days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    return (
        <div>
            <Header side="none" name="Calendar" />
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
            <div className="pt-12">
                <div className="font-bold text-xl pb-4">Recent entries</div>
                <RecentList />
            </div>
        </div>
    )
}

export default Calendar
