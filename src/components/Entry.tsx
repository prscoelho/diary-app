import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/rootReducer'
import { entrySelectors } from '../redux/selectors'

interface EntryProps {
    entry_id: string
}

const Entry: React.FC<EntryProps> = ({ entry_id }) => {
    const entry = useSelector((state: RootState) => entrySelectors.selectById(state, entry_id))

    if (typeof entry === "undefined") {
        return <div>Entry not found...</div>
    }

    return (
        <div>
            <h1>{entry.title}</h1>
            <p>{entry.content}</p>
            <Link to={`/entry/${entry.date_id}/${entry.id}`} >Update</Link>
        </div>
    )
}

export default Entry