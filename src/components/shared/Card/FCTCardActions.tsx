import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CardActions, { CardActionsProps } from '@material-ui/core/CardActions'

const FCTCardActions = withStyles(theme => ({
  '@global': {
    '.MuiCardActions-spacing > :not(:first-child)': {
      marginLeft: 15,
    },
  },
  root: {
    padding: '12px 24px',
    justifyContent: 'flex-end',
  },
}))((props: CardActionsProps) => {
  return <CardActions {...props}></CardActions>
})

export default FCTCardActions
