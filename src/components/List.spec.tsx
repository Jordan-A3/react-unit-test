import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List'

describe('List Component', () => {
    it('should render list items', async () => {
        const { getByText, rerender, queryByText } = render(<List initialItems={['Ananda', 'Diego']}/>)
        
        expect(getByText('Diego')).toBeInTheDocument()
    });

    it('should be able to add new item on the list', async () => {
        const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={['Ananda', 'Diego']}/>)

        const inputElement = getByPlaceholderText('New Item')
        const addButton = getByText('Adicionar')

        userEvent.type(inputElement, 'Novo')
        userEvent.click(addButton)

        expect(await findByText('Novo')).toBeInTheDocument()
    })

    it('should be able to remove item from the list', async () => {
        const { getByText, getAllByText, getByPlaceholderText } = render(<List initialItems={['Ananda', 'Diego']}/>)

        const addButton = getByText('Adicionar')
        const removeButtons = getAllByText('Remover')

        userEvent.click(removeButtons[0])

        await waitForElementToBeRemoved(() => {
            return getByText('Ananda')
        })
    })
})