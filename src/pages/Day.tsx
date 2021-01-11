import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { linkToText } from '../utils'
import { ParamTypes } from '../types'
import { daySelectors } from '../redux/selectors'
import { RootState } from '../redux/rootReducer'
import Entry from '../components/Entry'

const Day: React.FC = () => {
    const { date } = useParams<ParamTypes>()
    const ids = useSelector((state: RootState) => daySelectors.selectById(state, date))?.entries

    return (<div>
        <div>{linkToText(date)}</div>
        <div>{typeof ids !== "undefined" ? ids.map((id) =>
            <Entry key={id} entry_id={id} />
        ) :
            <p>No entries...</p>}</div>
        <Link to={`/entry/${date}`}>Add new</Link>
    </div>)
}

export default Day