import React from 'react'
import { Link, useParams } from 'react-router-dom'
import CreateEntry from '../components/CreateEntry'
import UpdateEntry from '../components/UpdateEntry'
import { ParamTypes } from '../types'

const Write: React.FC = props => {
    const { id, date } = useParams<ParamTypes>()

    return (
        <div>
            <div className="flex py-8 justify-between">
                <div className="px-4"></div>
                <div className="text-center text-gray-500 text-1xl font-semibold">Write</div>
                <Link to={`/day/${date}`} className="hover:bg-gray-100 px-4 py-2 rounded text-1xl font-semibold">╳</Link>
            </div>
            {typeof id === "undefined" ? <CreateEntry date={date} /> : <UpdateEntry date={date} entry_id={id} />}
        </div>
    )

}

export default Write