import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CardContent, { CardContentProps } from '@material-ui/core/CardContent'

const FCTCardContent = withStyles(theme => ({
  '@global': {
    '.MuiCardContent-root:last-child': {
      paddingBottom: 32,
    },
  },
  root: {
    padding: '32px 16px',
    fontSize: 14,
    fontWeight: 400,
  },
}))((props: CardContentProps) => {
  return <CardContent {...props}></CardContent>
})

export default FCTCardContent
