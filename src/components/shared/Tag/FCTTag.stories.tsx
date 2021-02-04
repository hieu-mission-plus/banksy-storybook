import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import FCTTag from './FCTTag'
import Avatar from '@material-ui/core/Avatar'
import { FormControlLabel, FormGroup, Switch, ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'
import { action } from '@storybook/addon-actions'
import { ChipProps } from '@material-ui/core/Chip'

export default {
  title: 'Example/Tag',
  component: FCTTag,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium'],
      },
    },
  },
} as Meta

const Template: Story<ChipProps> = args => {
  const [isAvatar, setIsAvatar] = useState(false)
  const [isDeleteIcon, setIsDeleteIcon] = useState(true)
  return (
    <ThemeProvider theme={theme}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={isDeleteIcon} onChange={() => setIsDeleteIcon(!isDeleteIcon)} />
          }
          label="Add DeleteIcon"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={isAvatar} onChange={() => setIsAvatar(!isAvatar)} />}
          label="Add Avatar"
        />
      </FormGroup>
      <FCTTag
        {...args}
        onDelete={isDeleteIcon ? action('onDelete') : undefined}
        label="Cindy Baker"
        avatar={
          isAvatar ? (
            <Avatar
              {...args}
              variant="circle"
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/3.jpg"
            />
          ) : undefined
        }
      />
    </ThemeProvider>
  )
}

export const Tag = Template.bind({})
Tag.args = {
  disabled: false,
  size: 'small',
}
