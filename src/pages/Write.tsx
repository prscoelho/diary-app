import React from 'react'
import { useParams } from 'react-router-dom'
import CreateEntry from '../components/CreateEntry'
import UpdateEntry from '../components/UpdateEntry'
import { ParamTypes } from '../types'

const Write: React.FC = props => {
    const { id, date } = useParams<ParamTypes>()

    if (typeof id === "undefined") {
        return (
            <CreateEntry date={date} />
        )
    } else {
        return (
            <UpdateEntry date={date} entry_id={id} />
        )
    }

}

export default Write