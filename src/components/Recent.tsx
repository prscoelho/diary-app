import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/rootReducer'
import { entrySelectors } from '../redux/selectors'

interface RecentProps {
    entry_id: string
}


const Recent: React.FC<RecentProps> = ({ entry_id }) => {
    const entry = useSelector((state: RootState) => entrySelectors.selectById(state, entry_id))

    if (typeof entry === "undefined") {
        return null
    }

    return (
        <Link to={`day/${entry.date_id}`} >
            <div className="rounded bg-indigo-100 py-4 px-6 mb-4 shadow">
                <div className="text-gray-600 text-xs">{entry.date_id}</div>
                <div className="font-semi-bold text-lg">{entry.title}</div>
            </div>
        </Link>
    )
}

export default Recent