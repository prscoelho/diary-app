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
        <div className="flex py-8 justify-between">
            <Link to="/" className="hover:bg-gray-100 px-4 py-2 rounded text-1xl font-semibold">&lt;</Link>
            <div className="text-center text-gray-500 text-1xl font-semibold">Diary</div>
            <div className="px-4"></div>
        </div>
        <div className="text-gray-500 text-sm">{linkToText(date)}</div>
        <div className="py-4 flex-row space-y-12">{typeof ids !== "undefined" ? ids.map((id) =>
            <Entry key={id} entry_id={id} />
        ) :
            <p>No entries...</p>}</div>
        <div className="flex justify-center">
            <Link to={`/entry/${date}`} className="rounded-full h-12 w-12 flex items-center justify-center bg-indigo-500 text-white text-2xl">+</Link>
        </div>
    </div>)
}

export default Day