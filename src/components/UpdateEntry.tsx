import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { entrySelectors } from '../redux/selectors'
import { RootState } from '../redux/rootReducer'
import { updateEntry } from '../redux/entry'
import { Entry } from '../redux/types'
import { Update } from '@reduxjs/toolkit'
import { deleteEntry, EntryDeleted } from '../redux/shared_actions'

interface UpdateEntryProps {
    entry_id: string
    date: string
}

const UpdateEntry: React.FC<UpdateEntryProps> = props => {
    const { entry_id, date } = props
    const entry = useSelector((state: RootState) => entrySelectors.selectById(state, entry_id))
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState(entry?.title || "");
    const [content, setContent] = useState(entry?.content || "");

    // this case should not happen since we're in UpdateEntry,
    // however entrySelectors.selectById returns Entry | undefined
    // we know that our id will be in the store but typescript doesn't
    if (typeof entry === "undefined") {
        return <div>Entry not found...</div>
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        setContent(e.target.value)
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let update: Update<Entry> = {
            id: entry_id,
            changes: {
                content,
                title
            }
        }
        dispatch(updateEntry(update))
        history.push(`/day/${date}`)
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const deleted: EntryDeleted = {
            id: entry_id,
            date_id: date
        }
        dispatch(deleteEntry(deleted))
        history.push(`/day/${date}`)
    }

    return (
        <div>
            <div>Title</div>
            <input value={title} onChange={handleTitleChange} placeholder="Add a title" />
            <div>Entry</div>
            <textarea onChange={handleContentChange} placeholder="Write something.." value={content}>
            </textarea>
            <button disabled={title === "" || content === ""} onClick={handleSubmit}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default UpdateEntry