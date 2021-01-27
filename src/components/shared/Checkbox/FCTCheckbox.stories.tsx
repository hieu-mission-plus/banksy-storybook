import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { Meta, Story } from '@storybook/react/types-6-0'
import theme from '../../../theme'
import FCTCheckbox from './FCTCheckbox'

export default {
  title: 'Example',
  component: FCTCheckbox,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['primary', 'default'],
      },
    },
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
      <FCTCheckbox {...args} />
    </ThemeProvider>
  )
}

export const CheckBox = Template.bind({})
CheckBox.args = {
  color: 'primary',
  size: 'medium',
  disabled: false,
  indeterminate: false,
}
