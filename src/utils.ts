import {
    eachDayOfInterval,
    startOfWeek,
    startOfMonth,
    endOfWeek,
    endOfMonth,
    lightFormat,
    parse,
    format
} from "date-fns"

// generate a board of week days for a given date month
// includes days that aren't part of the month if month doesn't start on sunday or ends on saturday
// rethink if input should be date or date string to allow for memoization
export function generate(day: Date): Date[] {
    let start = startOfWeek(startOfMonth(day))
    let end = endOfWeek(endOfMonth(day))

    return eachDayOfInterval({
        start: start,
        end: end
    })
}

export function dateToLink(date: Date): string {
    return lightFormat(date, "yyyy-MM-dd")
}

export function linkToDate(link: string): Date {
    return parse(link, "yyyy-MM-dd", new Date())
}

export function linkToText(link: string): string {
    const date_format = "EEEE, d LLLL y"

    return format(linkToDate(link), date_format)
}