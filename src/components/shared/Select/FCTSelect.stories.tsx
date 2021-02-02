import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import FCTSelect, { FCTSelectProps } from './FCTSelect'
import { Box, ThemeProvider } from '@material-ui/core'

import { ThemeProvider as SCThemeProvider } from 'styled-components'
import theme from '../../../theme'

export default {
  title: 'Example/Select',
  component: FCTSelect,
} as Meta

const Template: Story<FCTSelectProps> = args => {
  const [values, setValues] = React.useState<string[]>([])
  const [filterStr, setFilterStr] = React.useState<string>('')
  const options = args.options.filter(x => x.label?.includes(filterStr))
  return (
    <ThemeProvider theme={theme}>
      <SCThemeProvider theme={theme}>
        <Box style={{ width: 300 }}>
          <FCTSelect
            {...args}
            options={options}
            values={values}
            setValues={setValues}
            onFilter={(v: string) => {
              action('onFilter')
              setFilterStr(v)
            }}
            onChange={action('onChange')}
          ></FCTSelect>
        </Box>
      </SCThemeProvider>
    </ThemeProvider>
  )
}

export const Select = Template.bind({})
Select.args = {
  isDisabled: false,
  isMultiple: false,
  label: 'Label',
  options: Array.from({ length: 50 }).map((_, i) => ({ value: `item${i}`, label: `item${i}` })),
}
