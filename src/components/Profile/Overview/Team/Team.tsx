import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import styled from 'styled-components'
import theme from '../../../../theme'

const useStyles = makeStyles(() => ({
  people: {
    width: '100%',
  },
}))

const TeamContainer = styled('div')`
  margin-top: -16px;
`
const Team = styled('div')`
  display: flex;
  width: 100%;
  margin-top: 24px;
`
const Role = styled('div')`
  width: 128px;
  padding-top: 10px;
  font-weight: 600;
  font-size: 14px;
  color: ${theme.palette.secondary.main};
  @media (max-width: 400px) {
    width: 85px;
  }
`

const TeamOverview = withStyles(theme => ({
  '@global': {
    '.MuiAvatar-root': {
      height: 48,
      width: 48,
    },
    '.MuiListItem-gutters': {
      paddingLeft: 0,
    },
    '.MuiTypography-body1, .MuiTypography-body2': {
      letterSpacing: 0,
      display: 'block',
      width: 120,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'Ellipsis',
    },
    '.MuiTypography-body1': {
      fontWeight: 600,
      fontSize: 14,
    },
    '.MuiTypography-body2': {
      fontWeight: 'normal',
      fontSize: 12,
    },
    '.MuiListItemText-multiline': {
      marginLeft: 4,
    },
    '.MuiGrid-container': {
      width: '80%',
    },
  },
  root: {},
}))((teamProps: TeamProps) => {
  const classes = useStyles()
  return (
    <TeamContainer>
      {teamProps.teams.map((team: Team, index) => (
        <Team key={index}>
          <Role>
            <Typography noWrap>{team.role}</Typography>
          </Role>
          <Grid container className={classes.people}>
            {team.people.map((person: Person, index2) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index2}>
                <Tooltip
                  title={
                    <>
                      {person.name} <br />
                      {person.subRole}
                    </>
                  }
                  arrow
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={person.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={person.name} secondary={person.subRole} />
                  </ListItem>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Team>
      ))}
    </TeamContainer>
  )
})

export default TeamOverview

export interface Person {
  avatar: string
  name: string
  subRole: string
}

export interface Team {
  role: string
  people: Person[]
}

export interface TeamProps {
  teams: Team[]
}
