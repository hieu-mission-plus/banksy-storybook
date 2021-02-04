import React from 'react'
import { createStyles, withStyles } from '@material-ui/core/styles'
import Chip, { ChipProps } from '@material-ui/core/Chip'

const FCTTag = withStyles(theme =>
  createStyles({
    root: {
      height: 40,
      borderRadius: 100,
      background: '#F3F3F3',
      '&:hover': {
        background: '#F1FCF8',
        border: '1px solid #B3DBCA',
      },
      '&:hover > $label': {
        color: theme.palette.primary.light,
        fontWeight: 600,
      },
      '& $avatar': {
        padding: 0,
        marginLeft: 6,
        marginRight: 0,
        width: 30,
        height: 30,
      },
      '& $avatarSmall': {
        width: 18,
        height: 18,
      },
    },
    avatar: {},
    avatarSmall: {},
    sizeSmall: {
      height: 28,
      borderRadius: 3,
      background: theme.palette.grey[100],
    },
    label: {
      padding: 0,
      margin: '0px 10px',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal',
      color: '#717688',
    },
    labelSmall: {
      margin: '0px 8px',
      fontSize: 12,
      color: theme.palette.secondary.main,
    },
    deleteIcon: {
      height: 16,
      width: 16,
      color: '#22253F',
      margin: '0px 10px 0px 0px',
      '&:hover': {
        color: '#EB5A46',
      },
    },
    deleteIconSmall: {
      height: 10,
      width: 10,
      margin: '0px 8px 0px 0px',
    },
    disabled: {
      background: theme.palette.grey[100],
      '& $label, $labelSmall': {
        color: theme.palette.primary.contrastText,
      },
      '& $deleteIcon, $deleteIconSmall': {
        color: theme.palette.primary.contrastText,
      },
    },
  })
)((props: ChipProps) => {
  return <Chip {...props} />
})

export default FCTTag
