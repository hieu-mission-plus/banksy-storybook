import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card, { CardProps } from '@material-ui/core/Card'

const FCTCard = withStyles(theme => ({
  root: {
    color: '#1E293B',
  },
}))((props: CardProps) => {
  return <Card variant="outlined" {...props}></Card>
})

export default FCTCard
