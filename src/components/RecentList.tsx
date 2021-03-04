import { EntityId } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { entrySelectors } from '../redux/selectors'
import Recent from './Recent'

const RecentList: React.FC = () => {
    const all_ids: EntityId[] = useSelector((state: RootState) => entrySelectors.selectIds(state))

    // show three last added entries
    const recent = all_ids.slice(Math.max(0, all_ids.length - 3)).reverse()

    return (
        <div>
            {recent.map((entry_id) => <Recent key={entry_id} entry_id={`${entry_id}`} />)}
        </div>
    )
}

export default RecentList