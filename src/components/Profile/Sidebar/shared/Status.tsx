import React from 'react'
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import styled from 'styled-components'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    status: {
      marginLeft: 4,
      fontWeight: 'normal',
      fontSize: 12,
      lineHeight: '18px',
      color: '#29BA74',
    },
    deactiveColor: {
      color: '#94A3B8',
    },
  })
)

interface IStatusProps {
  status: number
}

const StatusContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`

const IconStatusActive = styled('div')`
  border-radius: 50%;
  border: 4px solid #29ba74;
  width: 0;
  height: 0;
`

const IconStatusDeactive = styled(IconStatusActive)`
  border: 4px solid #94a3b8;
`

export const Status = (props: IStatusProps) => {
  const classes = useStyles()
  return (
    <StatusContainer>
      {props.status ? (
        <>
          <IconStatusActive />
          <Typography className={classes.status}>Active</Typography>
        </>
      ) : (
        <>
          <IconStatusDeactive />
          <Typography className={clsx(classes.status, classes.deactiveColor)}>Deactive</Typography>
        </>
      )}
    </StatusContainer>
  )
}
