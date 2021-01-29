import { TextField, TextFieldProps, withStyles } from '@material-ui/core'
import React from 'react'

const FCTTextField = withStyles(theme => ({
  root: {
    width: 300,
    height: 50,
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#29BA74',
      },
      borderColor: '#29BA74',
    },
  },
}))((props: TextFieldProps) => {
  return <TextField className={'root'} {...props} />
})

export default FCTTextField
