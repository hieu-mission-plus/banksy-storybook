import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import FCTSelect, { ChipItem, FCTSelectProps } from './FCTSelect'
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
        <Box
          style={{
            width: 300,
            margin: 'auto',
            maxHeight: '100px',
            overflow: 'auto',
            background: '#ccc',
            padding: 75,
          }}
        >
          <Box height={1000}>
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
            />
          </Box>
        </Box>
      </SCThemeProvider>
    </ThemeProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  isDisabled: false,
  isMultiple: false,
  label: 'Label',
  options: Array.from({ length: 50 }).map((_, i) => ({ value: `item${i}`, label: `item${i}` })),
  format: (item: string, onDelete: () => void) => (
    <ChipItem label={item} size="small" onDelete={onDelete} />
  ),
}

export const CustomFormat = Template.bind({})
CustomFormat.args = {
  ...Default.args,
  isSearchable: false,
  format: (item: string, onDelete: () => void) => (
    <Box>
      Displaying <strong>{item}</strong>
    </Box>
  ),
}
