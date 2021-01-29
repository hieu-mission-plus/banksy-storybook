import { render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'
import React from 'react'
import FCTTextField from './FCTTextField'

const renderComponent = (view: any) => render(<ThemeProvider theme={theme}>{view}</ThemeProvider>)
it('Should show TextField correctly', () => {
  const TextField = renderComponent(<FCTTextField color="primary">TextField</FCTTextField>)
  expect(TextField).toBeTruthy()
})
