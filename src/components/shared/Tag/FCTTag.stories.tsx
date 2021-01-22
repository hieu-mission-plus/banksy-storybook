import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import FCTTag, { FCTTagProps } from './FCTTag'
import Avatar from '@material-ui/core/Avatar'
import { FormControlLabel, FormGroup, Switch, ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Example/Tag',
  component: FCTTag,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium'],
      },
      table: {
        defaultValue: { summary: 'small' },
      },
    },
  },
} as Meta

const Template: Story<FCTTagProps> = args => {
  const [isAvatar, setIsAvatar] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={isAvatar} onChange={() => setIsAvatar(!isAvatar)} />}
          label="Add Avatar"
        />
      </FormGroup>
      <FCTTag
        {...args}
        onDelete={action('onDelete')}
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
  size: 'medium',
}
