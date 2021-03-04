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
            <div className="pb-4">
                {/* we use the index as key here because each entry paragraph does not have a unique id. These paragraphs won't be reordered, the only way to change this content is to unmount <Day /> and go through <Write />, which should make this safe */}
                {lines.map((line, idx) => <p key={idx} className="pb-1 h-6 text-justify">{line}</p>)}
            </div>
            <Link to={`/entry/${entry.date_id}/${entry.id}`} className="bg-indigo-500 rounded text-white w-24 flex items-center justify-center ">Edit</Link>
        </div>
    )
}

export default Entry