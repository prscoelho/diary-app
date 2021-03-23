import { fireEvent, screen, wrapperRender } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'

import Modal from '../components/Modal'

test('deletes entry on modal delete button click', async () => {
    const setOpen = jest.fn()
    const handleDelete = jest.fn()
    wrapperRender(
        <Modal open={true} setOpen={setOpen} deleteEntry={handleDelete} />
    )

    fireEvent.click(screen.getByText("Delete"))
    expect(handleDelete).toHaveBeenCalled()
    expect(setOpen).toHaveBeenCalledWith(false)
})

test('closes modal on cancel and doesn\'t delete entry', async () => {
    const setOpen = jest.fn()
    const handleDelete = jest.fn()
    wrapperRender(
        <Modal open={true} setOpen={setOpen} deleteEntry={handleDelete} />
    )

    fireEvent.click(screen.getByText("Cancel"))
    expect(handleDelete).not.toHaveBeenCalled()
    expect(setOpen).toHaveBeenCalledWith(false)
})