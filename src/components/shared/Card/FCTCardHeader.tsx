import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CardHeader, { CardHeaderProps } from '@material-ui/core/CardHeader'

const FCTCardHeader = withStyles(theme => ({
  root: {
    padding: 0,
    paddingLeft: 16,
    height: 49,
    borderBottom: '1px solid #E7ECF3',
    '& *': {
      fontWeight: 500,
      fontSize: 14,
    },
  },
  action: {
    marginRight: 10,
    marginTop: 4,
  },
}))((props: FCTCardHeaderProps) => {
  return (
    <CardHeader
      title={props.titleElement ? props.titleElement : props.title}
      {...props}
    ></CardHeader>
  )
})

export default FCTCardHeader

export interface FCTCardHeaderProps extends CardHeaderProps {
  titleElement?: React.ReactNode | string
}
