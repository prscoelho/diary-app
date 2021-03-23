import React, { useState } from 'react'

import { Menu, Transition } from "@headlessui/react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deleteEntry, EntryDeleted } from '../redux/entry'
import Modal from './Modal';

interface DropdownProps {
    entry_id: string
    date_id: string
}

const Dropdown: React.FC<DropdownProps> = ({ entry_id, date_id }) => {
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = () => {
        const deleted: EntryDeleted = {
            id: entry_id,
            date_id: date_id
        }
        dispatch(deleteEntry(deleted))
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
                <>
                    <Menu.Button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true">
                        ...
                    </Menu.Button>

                    {/* 
                        Dropdown menu, show/hide based on menu state.

                        Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                        Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    -->*/
                    }
                    <Transition className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu"
                        show={open}>
                        <Menu.Items className="py-1" role="none">
                            <Menu.Item>
                                <Link to={`/entry/${date_id}/${entry_id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <button onClick={() => setModal(true)} className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Delete</button>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                    <Modal open={modal} setOpen={setModal} deleteEntry={handleDelete} />
                </>
            )
            }
        </Menu >
    )
}

export default Dropdown