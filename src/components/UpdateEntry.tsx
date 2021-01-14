import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { entrySelectors } from '../redux/selectors'
import { RootState } from '../redux/rootReducer'
import { Entry, updateEntry, deleteEntry, EntryDeleted } from '../redux/entry'
import { Update } from '@reduxjs/toolkit'

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
    // it's only possible if someone types a random date into the url bar
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
        <div className="flex-row space-y-4">
            <div>Title</div>
            <input type="text" className="w-full" value={title} onChange={handleTitleChange} placeholder="Add a title" />
            <div>Entry</div>
            <textarea className="w-full h-96 resize-none" onChange={handleContentChange} placeholder="Write something.." value={content}>
            </textarea>
            <div className="flex justify-center space-x-4">
                <button className="disabled:opacity-50 bg-indigo-700 rounded text-white w-24" disabled={title === "" || content === ""} onClick={handleSubmit}>Update</button>
                <button className="rounded border-2 border-indigo-500 text-indigo-500 w-24" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default UpdateEntry