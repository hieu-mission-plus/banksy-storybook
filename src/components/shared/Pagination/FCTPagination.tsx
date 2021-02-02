import React from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { PaginationProps } from '@material-ui/lab/Pagination'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import '../../../font/font.css'
const useStyles = makeStyles((theme: Theme) => {
  console.log(theme)

  return createStyles({
    root: {
      '& .MuiPaginationItem-root': {
        color: '#94A3B8',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 3,
        fontWeight: 600,
        margin: '0px 2.5px',
        fontFamily: 'Inter',
      },
      '& .Mui-selected': {
        backgroundColor: theme.palette.primary.light,

        color: '#FFFFFF',
      },
      '& .MuiPaginationItem-icon': {
        fontSize: '1.7rem',
      },
      '& .MuiPaginationItem-root:hover': {
        backgroundColor: theme.palette.primary.light,
        color: '#FFFFFF',
        borderRadius: 3,
      },
    },
    ul: {
      marginRight: 20,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        marginRight: 0,
      },
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end',
      },
    },
  })
})

export const FCTPagination = (props: PaginationProps) => {
  const classes = useStyles()

  return <Pagination {...props} classes={classes} shape="rounded" page={props.page || 0} />
}
