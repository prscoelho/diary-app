import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createEntry, Entry } from '../redux/entry'
import { nanoid } from 'nanoid'

interface CreateEntryProps {
    date: string
}

const CreateEntry: React.FC<CreateEntryProps> = props => {
    const { date } = props
    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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
        let entry: Entry = {
            title,
            content,
            date_id: date,
            id: nanoid(),
        }
        dispatch(createEntry(entry))
        history.push(`/day/${date}`)
    }

    return (
        <div>
            <div>Title</div>
            <input type="text" className="w-full" value={title} onChange={handleTitleChange} placeholder="Add a title" />
            <div>Entry</div>
            <textarea className="w-full resize-none h-80" onChange={handleContentChange} placeholder="Write something.." value={content}>
            </textarea>
            <div className="flex justify-center">
                <button className="disabled:opacity-30 bg-indigo-500 rounded text-white w-24" disabled={title === "" || content === ""} onClick={handleSubmit}>Create</button>
            </div>
        </div>
    )
}

export default CreateEntry