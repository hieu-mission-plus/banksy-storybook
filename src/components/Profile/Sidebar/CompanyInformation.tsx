import React from 'react'
import { createStyles, Grid, Link, makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import FCTIcon, { IconMap } from '../../shared/Icon/Icon'
import { GroupTitle } from './shared/GroupTitle'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    groupStyle: {
      marginBottom: 18,
    },
    titleStyle: {
      height: 22,
    },
    titleText: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: '22px',
      marginLeft: 12,
      letterSpacing: '0.3px',
      color: '#1E293B',
    },
    contentText: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: '0.3px',
      color: '#1E293B',
    },
    linkColor: {
      color: '#29BA74',
    },
    nullColor: {
      color: '#94A3B8',
    },
  })
)
export interface ICompanyInformation {
  launchDay: string
  ownership: string
  valuation: string
  employees: string
  website: string
  socials: string
  address: string
}
interface ICompanyInformationProps {
  data: ICompanyInformation
}

interface IInformationItemProps {
  title: string
  icon: keyof typeof IconMap
  value: string
  isLink: boolean
}

export const InformationItem = (props: IInformationItemProps) => {
  const classes = useStyles()
  return (
    <Grid container direction="row" className={classes.groupStyle}>
      <Grid container item className={classes.titleStyle} xs={5} alignItems="center">
        <FCTIcon name={props.icon} width="14px" height="14px" color="#94A3B8" />
        <Typography className={classes.titleText}>{props.title}:</Typography>
      </Grid>
      <Grid item xs>
        {props.value ? (
          props.isLink ? (
            <Link href="#">
              <Typography className={clsx(classes.contentText, classes.linkColor)}>
                {props.value}
              </Typography>
            </Link>
          ) : (
            <Typography className={classes.contentText}>{props.value}</Typography>
          )
        ) : (
          <Typography className={clsx(classes.contentText, classes.nullColor)}>N/A</Typography>
        )}
      </Grid>
    </Grid>
  )
}

export const CompanyInformation = (props: ICompanyInformationProps) => {
  return (
    <>
      <GroupTitle name="COMPANY INFORMATION"></GroupTitle>
      <Grid item container direction="column" xs={12}>
        <InformationItem
          title="Launch day"
          value={props.data.launchDay}
          icon="calendar"
          isLink={false}
        ></InformationItem>
        <InformationItem
          title="Ownership"
          value={props.data.ownership}
          icon="team"
          isLink={true}
        ></InformationItem>
        <InformationItem
          title="Valuation"
          value={props.data.valuation}
          icon="money"
          isLink={false}
        ></InformationItem>
        <InformationItem
          title="Employees"
          value={props.data.employees}
          icon="team"
          isLink={false}
        ></InformationItem>
        <InformationItem
          title="Website"
          value={props.data.website}
          icon="link"
          isLink={true}
        ></InformationItem>
        <InformationItem
          title="Socials"
          value={props.data.socials}
          icon="network"
          isLink={true}
        ></InformationItem>
        <InformationItem
          title="Address"
          value={props.data.address}
          icon="location"
          isLink={false}
        ></InformationItem>
      </Grid>
    </>
  )
}
