import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import FCTCard from './FCTCard'
import FCTCardHeader from './FCTCardHeader'
import FCTCardContent from './FCTCardContent'
import FCTCardActions from './FCTCardActions'
import { CardProps, IconButton, Link, makeStyles, ThemeProvider } from '@material-ui/core'
import theme from '../../../theme'
import FCTButton from '../Button/FCTButton'
import FCTIcon from '../Icon/Icon'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Example/Card',
  component: FCTCard,
} as Meta

const useStyles = makeStyles(() => ({
  root: {
    '@global': {
      '.MuiTypography-h5': {
        fontWeight: 600,
        fontSize: 18,
      },
      '.MuiButton-root': {
        width: 114,
        height: 40,
      },
      '.MuiLink-button': {
        color: theme.palette.secondary.main,
      },
      '.MuiLink-button:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
  },
}))

const CommonCardTemplate: Story<CardProps> = (args: CardProps) => {
  return (
    <ThemeProvider theme={theme}>
      <FCTCard {...args}>
        <FCTCardHeader title="Header"></FCTCardHeader>
        <FCTCardContent>
          <span>Content</span>
        </FCTCardContent>
      </FCTCard>
    </ThemeProvider>
  )
}

export const CommonCard = CommonCardTemplate.bind({})
CommonCard.args = {}

export const PopupCard: Story<CardProps> = (args: CardProps) => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <FCTCard {...args} className={classes.root}>
        <FCTCardHeader
          title="Add new step"
          action={
            <IconButton onClick={action('Close')}>
              <FCTIcon name="close" width={17} height={17} color={theme.palette.secondary.main} />
            </IconButton>
          }
        ></FCTCardHeader>

        <FCTCardContent></FCTCardContent>

        <FCTCardActions>
          <Link component="button" variant="body2" underline="none" onClick={action('Cancel')}>
            Cancel
          </Link>
          <FCTButton variant="outlined" color="primary" size="small" onClick={action('Add')}>
            Add
          </FCTButton>
        </FCTCardActions>
      </FCTCard>
    </ThemeProvider>
  )
}
