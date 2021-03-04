import React from 'react'
import { useParams } from 'react-router-dom'
import EntryForm from '../components/EntryForm'
import Header from '../components/Header'
import HeaderButton from '../components/HeaderButton'
import { ParamTypes } from '../types'

const Write: React.FC = props => {
    const { id, date } = useParams<ParamTypes>()

    return (
        <div>
            <Header link={<HeaderButton to={`/day/${date}`} text="╳" />} name="Write" side="right" ></Header>
            <EntryForm date={date} entry_id={id} />
        </div>
    )

}

export default Write