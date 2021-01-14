import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { entrySelectors } from '../redux/selectors'
import { RootState } from '../redux/rootReducer'
import { Entry, updateEntry, deleteEntry, EntryDeleted, createEntry } from '../redux/entry'
import { nanoid, Update } from '@reduxjs/toolkit'

interface EntryFormProps {
    date: string
    entry_id?: string
}

const EntryForm: React.FC<EntryFormProps> = props => {
    const { entry_id = "none", date } = props
    const entry = useSelector((state: RootState) => entrySelectors.selectById(state, entry_id))
    const dispatch = useDispatch()
    const history = useHistory()
    const new_entry = entry_id === "none"
    const [title, setTitle] = useState(entry?.title || "");
    const [content, setContent] = useState(entry?.content || "");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        setContent(e.target.value)
    }

    const handleUpdate = () => {
        let update: Update<Entry> = {
            id: entry_id,
            changes: {
                content,
                title
            }
        }
        dispatch(updateEntry(update))
    }

    const handleCreate = () => {
        let entry: Entry = {
            title,
            content,
            date_id: date,
            id: nanoid(),
        }
        dispatch(createEntry(entry))
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (new_entry) {
            handleCreate()
        } else {
            handleUpdate()
        }
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
        <form className="flex-row space-y-8">
            <div>
                <div>Title</div>
                <input type="text" className="w-full" value={title} onChange={handleTitleChange} placeholder="Add a title" />
            </div>
            <div>
                <div>Entry</div>
                <textarea className="w-full h-96 resize-none" onChange={handleContentChange} placeholder="Write something.." value={content}>
                </textarea>
            </div>
            <div className="flex justify-center space-x-4">
                <button className="disabled:opacity-50 bg-indigo-700 rounded text-white w-24" disabled={title === "" || content === ""} onClick={handleSubmit}>{new_entry ? "Create" : "Update"}</button>
                {!new_entry ? <button className="rounded border-2 border-indigo-500 text-indigo-500 w-24" onClick={handleDelete}>Delete</button> : null}
            </div>
        </form>
    )
}

export default EntryForm