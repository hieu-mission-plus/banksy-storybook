import React from 'react'
import { Checkbox, withStyles, CheckboxProps, Theme } from '@material-ui/core'

const FCTCheckbox = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.grey[300],
  },
}))((props: CheckboxProps) => {
  return <Checkbox {...props} />
})

export default FCTCheckbox
