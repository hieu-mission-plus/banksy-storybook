import React from 'react'
import FCTRadio from './FCTRadio'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'

const renderComponent = (view: any) => render(<ThemeProvider theme={theme}>{view}</ThemeProvider>)

it('Should show button correctly', () => {
  const Radio = renderComponent(<FCTRadio color="primary" />)
  expect(Radio).toBeTruthy()
})
