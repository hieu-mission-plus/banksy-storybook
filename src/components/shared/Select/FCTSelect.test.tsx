import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/core'
import { ThemeProvider as SCThemeProvider } from 'styled-components'

import theme from '../../../theme'
import FCTSelect from './FCTSelect'

const renderComponent = (view: any) =>
  render(
    <ThemeProvider theme={theme}>
      <SCThemeProvider theme={theme}>{view}</SCThemeProvider>
    </ThemeProvider>
  )

it('Should show select correctly', () => {
  const Select = renderComponent(
    <FCTSelect
      options={[{ label: 'FCT Banksy', value: 'FCT Banksy' }]}
      values={[]}
      setValues={v => {}}
      label="Select"
      onFilter={v => {}}
    />
  )
  expect(Select).toBeTruthy()
})
