import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import TeamOverview, { TeamProps } from './Team'
import FCTCard from '../../../shared/Card/FCTCard'
import FCTCardHeader from '../../../shared/Card/FCTCardHeader'
import FCTCardContent from '../../../shared/Card/FCTCardContent'
import { ThemeProvider } from '@material-ui/core'
import theme from '../../../../theme'
import { Team } from './Team'
import { makeStyles } from '@material-ui/core/styles'

const teams: Team[] = [
  {
    role: 'Founder',
    people: [
      {
        avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
        name: 'Dominic Pym',
        subRole: 'Co-Founder',
      },
      {
        avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
        name: 'Dominic Pym',
        subRole: 'Co-Founder',
      },
    ],
  },
  {
    role: 'Manager',
    people: [
      {
        avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
        name: 'Dominic Pym',
        subRole: 'Head of Technology',
      },
    ],
  },
]

const useStyles = makeStyles(() => ({
  root: {
    '@global': {
      '.MuiCardContent-root': {
        padding: '16px 16px 24px 16px',
      },
    },
  },
}))

export default {
  title: 'Profile/Overview',
  component: TeamOverview,
} as Meta

const Template: Story<TeamProps> = args => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <FCTCard className={classes.root}>
        <FCTCardHeader title="Team"></FCTCardHeader>
        <FCTCardContent>
          <TeamOverview {...args} teams={teams} />
        </FCTCardContent>
      </FCTCard>
    </ThemeProvider>
  )
}

export const TeamStorybook = Template.bind({})
TeamStorybook.args = {}
