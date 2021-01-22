import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'
import FCTTag from './FCTTag'
import { action } from '@storybook/addon-actions'

const renderComponent = (view: any) => render(<ThemeProvider theme={theme}>{view}</ThemeProvider>)

it('Should show Tag correctly', () => {
  const Tag = renderComponent(<FCTTag onDelete={action('onDelete')} />)
  expect(Tag).toBeTruthy()
})
