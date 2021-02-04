import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/core'
import theme from '../../../../theme'
import TeamOverview, { Team } from './Team'

const teams: Team[] = [
  {
    role: 'Founder',
    people: [
      {
        avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
        name: 'Dominic Pym',
        subRole: 'Co-Founder',
      },
    ],
  },
]

const renderComponent = (view: any) => render(<ThemeProvider theme={theme}>{view}</ThemeProvider>)

it('Should show TeamOverview correctly', () => {
  const Team = renderComponent(<TeamOverview teams={teams} />)
  expect(Team).toBeTruthy()
})
