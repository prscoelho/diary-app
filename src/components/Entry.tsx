import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/rootReducer'
import { entrySelectors } from '../redux/selectors'

interface EntryProps {
    entry_id: string
}

const line_regex = /\r?\n/

const Entry: React.FC<EntryProps> = ({ entry_id }) => {
    const entry = useSelector((state: RootState) => entrySelectors.selectById(state, entry_id))

    if (typeof entry === "undefined") {
        return <div>Entry not found...</div>
    }

    let lines = entry.content.split(line_regex)

    return (
        <div className="flex-row">
            <h1 className="text-2xl font-bold pb-2">{entry.title}</h1>
            {lines.map((line) => <p className="pb-4 text-justify">{line}</p>)}
            <Link className="bg-indigo-500 text-white px-4 py-2 rounded" to={`/entry/${entry.date_id}/${entry.id}`}>Edit</Link>
        </div>
    )
}

export default Entry