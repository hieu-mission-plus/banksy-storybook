import React from 'react'
import { createStyles, Grid, Link, makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import MultiSelectTreeView from './shared/TreeView'
import { GroupTitle } from './shared/GroupTitle'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleText: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: '0.3px',
      color: '#1E293B',
    },
    contentText: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: '0.3px',
      color: '#29BA74',
    },
    itemStyle: {
      marginBottom: 18,
    },
    nullColor: {
      color: '#94A3B8',
    },
  })
)

export interface ITreeView {
  id: number
  name: string
  children: ITreeView[] | null
}

export interface ICategoriesTags {
  name: string
  type: number
  value: string | ITreeView
}

interface ICategoriesTagsProps {
  data: ICategoriesTags[]
}

export const CategoriesTags = (props: ICategoriesTagsProps) => {
  const classes = useStyles()
  return (
    <>
      <GroupTitle name="CATEGORIES & TAGS"></GroupTitle>
      <Grid container>
        {props.data.map((item: ICategoriesTags, index: number) => (
          <Grid key={index} container className={classes.itemStyle}>
            <Grid item container xs={5}>
              <Typography className={classes.titleText}>{item.name}:</Typography>
            </Grid>
            <Grid item container xs>
              {item.value ? (
                item.type ? (
                  <MultiSelectTreeView data={item.value}></MultiSelectTreeView>
                ) : (
                  <Link href="#"><Typography className={classes.contentText}>{item.value}</Typography></Link>
                )
              ) : (
                <Typography className={clsx(classes.contentText, classes.nullColor)}>N/A</Typography>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
