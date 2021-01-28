import React from 'react'
import { createStyles, Divider, Grid, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    styleGroup: {
      margin: '17px 0 23px',
    },
    groupText: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '18px',
      color: '#6C809D',
    },
    divider: {
      margin: 8,
      marginRight: 0,
      flex: 1,
    },
  })
)

interface IGroupTitleProps {
  name: string
}

export const GroupTitle = (props: IGroupTitleProps) => {
  const classes = useStyles()
  return (
    <Grid item container xs={12} className={classes.styleGroup}>
      <Typography className={classes.groupText}>{props.name}</Typography>
      <Divider className={classes.divider} />
    </Grid>
  )
}
