import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import FCTRadio from './FCTRadio'
import { RadioProps, ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

export default {
  title: 'Example/Radio',
  component: FCTRadio,
} as Meta

const Template: Story<RadioProps> = args => {
  return (
    <ThemeProvider theme={theme}>
      <FormControl component="fieldset">
        <RadioGroup name="customized-radios">
          <FormControlLabel
            control={<FCTRadio {...args} />}
            label={args.checked ? 'Selected' : 'Unselect'}
          />
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  )
}

export const Radio = Template.bind({})
Radio.args = {
  checked: true,
}
