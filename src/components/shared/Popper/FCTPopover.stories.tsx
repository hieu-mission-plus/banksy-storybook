import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Box, ThemeProvider } from '@material-ui/core'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import theme from '../../../theme'
import FCTPopover from './FCTPopover'

export default {
  title: 'Example',
  component: FCTPopover,
} as Meta

const Template: Story<any> = args => {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [isVisible, setVisibility] = React.useState(false)

  const handleClick = () => {
    setVisibility(!isVisible)
  }

  const handleClickAway = () => {
    setVisibility(false)
  }
  return (
    <ThemeProvider theme={theme}>
      <SCThemeProvider theme={theme}>
        <button
          style={{ position: 'absolute', left: '50%', top: '50%' }}
          ref={buttonRef}
          onClick={handleClick}>
          Popover
        </button>
        <FCTPopover isVisible={isVisible} handleClickAway={handleClickAway} targetRef={buttonRef} {...args}>
            <Box>Hello Popover !</Box>
        </FCTPopover>
      </SCThemeProvider>
    </ThemeProvider>
  )
}

export const Popover = Template.bind({})
