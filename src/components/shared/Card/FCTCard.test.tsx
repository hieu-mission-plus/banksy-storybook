import React from 'react'
import FCTCard from './FCTCard'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'

const renderComponent = (view: any) => render(<ThemeProvider theme={theme}>{view}</ThemeProvider>)

it('Should show Card correctly', () => {
  const Card = renderComponent(<FCTCard />)
  expect(Card).toBeTruthy()
})
