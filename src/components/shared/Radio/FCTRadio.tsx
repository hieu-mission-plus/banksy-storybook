import React from 'react'
import clsx from 'clsx'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Radio, { RadioProps } from '@material-ui/core/Radio'

const useStyles = makeStyles(theme => ({
  icon: {
    borderRadius: '50%',
    width: 13,
    height: 13,
    border: '1px solid #BDC0CA',
    background: theme.palette.primary.contrastText,
  },
  checkedIcon: {
    display: 'flex',
    backgroundColor: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.light}`,
    '&:before': {
      borderRadius: '50%',
      display: 'block',
      width: 8,
      height: 8,
      background: theme.palette.primary.light,
      margin: 'auto',
      content: '""',
    },
  },
}))

const FCTRadio = withStyles(theme => ({
  '@global': {
    '.MuiTypography-body1': {
      fontSize: 14,
    },
  },
  root: {},
}))((props: RadioProps) => {
  const classes = useStyles()
  return (
    <Radio
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  )
})

export default FCTRadio
