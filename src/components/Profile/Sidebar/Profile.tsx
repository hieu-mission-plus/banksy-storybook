import React from 'react'
import { createStyles, Link, makeStyles, Theme, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Rating from '@material-ui/lab/Rating'
import clsx from 'clsx'
import FCTIcon from '../../shared/Icon/Icon'
import styled from 'styled-components'
import { Status } from './shared/Status'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: 102,
      height: 102,
      borderRadius: 3,
    },
    rating: {
      fontSize: 17,
      color: '#FF9F19',
      marginRight: 8,
    },
    descriptionText: {
      fontSize: 14,
      lineHeight: '22px',
      color: '#1E293B',
      letterSpacing: '0.2px',
      marginBottom: 35,
    },
    nameText: {
      fontWeight: 600,
      fontSize: 20,
      lineHeight: '26px',
      color: '#0F172A',
      marginTop: 26,
    },
    titleText: {
      fontSize: 12,
      lineHeight: '18px',
      color: '#1E293B',
      marginRight: 8,
    },
    ratingText: {
      fontWeight: 600,
      marginRight: 4,
    },
  })
)

export interface TitleGroupProps {
  name: string
  avatar: string
  status: number
  rating: number
  decs: string
}

interface IProfileProps {
  data: TitleGroupProps
}

const FlexBox = styled('div')`
  display: flex;
  margin: 4px 0 14px;
`

const AvatarContainer = styled('div')`
  padding: 9px;
  background-color: #ffffff;
  border-radius: 3px;
  border: 1px solid #e7ecf3;
`

const InformationContainer = styled(FlexBox)`
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 0 16px;
`

const RatingContainer = styled(FlexBox)`
  align-items: center;
  margin: 10px 0 0 0;
`
const MAXIMUM_RATE = 5;

export const Profile = (props: IProfileProps) => {
  const classes = useStyles()
  return (
    <>
      <FlexBox>
        <AvatarContainer>
          <Avatar alt="Avatar" src={props.data.avatar} className={classes.avatar} />
        </AvatarContainer>
        <InformationContainer>
          <Status status={props.data.status}></Status>
          <Typography className={classes.nameText}>{props.data.name}</Typography>
          <RatingContainer>
            <Rating
              className={classes.rating}
              name="half-rating-read"
              defaultValue={props.data.rating}
              precision={0.5}
              readOnly
            />
            <Typography className={clsx(classes.titleText, classes.ratingText)}>
              {props.data.rating}/{MAXIMUM_RATE}
            </Typography>
            <Typography className={classes.titleText}>total score</Typography>
            <Link href="#">
              <FCTIcon name="export1" width="14" height="14" color="#1DA462"/>
            </Link>
          </RatingContainer>
        </InformationContainer>
      </FlexBox>
      <Typography className={classes.descriptionText}>{props.data.decs}</Typography>
    </>
  )
}
