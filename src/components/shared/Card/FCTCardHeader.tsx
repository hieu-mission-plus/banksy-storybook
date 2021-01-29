import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CardHeader, { CardHeaderProps } from '@material-ui/core/CardHeader'

const FCTCardHeader = withStyles(theme => ({
  '@global': {
    '.MuiTypography-h5': {
      fontWeight: 500,
      fontSize: 14,
    },
  },
  root: {
    padding: 0,
    paddingLeft: 16,
    height: 49,
    borderBottom: '1px solid #E7ECF3',
  },
  action: {
    marginRight: 10,
    marginTop: 4,
  },
}))((props: CardHeaderProps) => {
  return <CardHeader {...props}></CardHeader>
})

export default FCTCardHeader
