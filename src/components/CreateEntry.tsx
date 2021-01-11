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
            <input value={title} onChange={handleTitleChange} placeholder="Add a title" />
            <div>Entry</div>
            <textarea onChange={handleContentChange} placeholder="Write something.." value={content}>
            </textarea>
            <button disabled={title === "" || content === ""} onClick={handleSubmit}>Create</button>
        </div>
    )
}

export default CreateEntry