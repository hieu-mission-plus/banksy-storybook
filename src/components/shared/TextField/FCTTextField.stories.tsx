import { Meta, Story } from '@storybook/react/types-6-0'
import { ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'
import React from 'react'
import FCTTextField from './FCTTextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '../Icon/Icon'

export default {
  title: 'Example',
  component: FCTTextField,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium'],
      },
    },
  },
} as Meta
const Template: Story<any> = args => {
  return (
    <ThemeProvider theme={theme}>
      <FCTTextField
        label={args.title ? 'Title' : false}
        placeholder={args.title ? false : 'Title'}
        error={args.err}
        type="text"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon
                style={{ cursor: 'pointer' }}
                name={'search'}
                width={18}
                height={20}
                color={'#6C809D'}
              />
            </InputAdornment>
          ),
        }}
        InputLabelProps={args.shrinkLabel ? { shrink: true } : false}
        helperText={args.err ? <span style={{ float: 'right' }}>"Err"</span> : ''}
        {...args}
      />
    </ThemeProvider>
  )
}

export const TextField = Template.bind({})
TextField.args = {
  disabled: false,
  shrinkLabel: true,
  err: false,
  title: true,
}
