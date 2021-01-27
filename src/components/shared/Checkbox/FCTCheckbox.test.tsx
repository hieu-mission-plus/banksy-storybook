import { render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'
import React from 'react'
import FCTCheckbox from './FCTCheckbox'

const renderComponent = (view: any) => render(<ThemeProvider theme={theme}>{view}</ThemeProvider>)
it('Should show button correctly', () => {
  const Button = renderComponent(<FCTCheckbox color="primary">Checkbox</FCTCheckbox>)
  expect(Button).toBeTruthy()
})
