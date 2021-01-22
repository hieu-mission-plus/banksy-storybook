import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'
import FCTTag from './FCTTag'

const renderComponent = (view: any) => render(<ThemeProvider theme={theme}>{view}</ThemeProvider>)

it('Should show Tag correctly', () => {
  const Tag = renderComponent(<FCTTag />)
  expect(Tag).toBeTruthy()
})
