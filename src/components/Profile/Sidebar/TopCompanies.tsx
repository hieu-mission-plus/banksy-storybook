import React from 'react'
import {
  createStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  withStyles,
} from '@material-ui/core'
import clsx from 'clsx'
import { GroupTitle } from './shared/GroupTitle'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: '100%',
      marginBottom: 5,
    },
    tableCell: {
      fontSize: 12,
      padding: '7px 14px',
      lineHeight: '18px',
      color: '#1E293B',
      borderBottom: 0,
    },
    fontBold: {
      fontWeight: 600,
    },
  })
)

const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#F1F5F9',
      },
    },
  })
)(TableRow)

interface IDataTopCompanies {
  name: string,
  total: string,
}

interface ITopCompaniesProps {
  data: IDataTopCompanies[],
}

export const TopCompanies = (props: ITopCompaniesProps) => {
  const classes = useStyles()
  return (
    <>
      <GroupTitle name="TOP 10 SIMILIAR COMPANIES"></GroupTitle>
      <Table className={classes.table} aria-label="customized table">
        <TableBody>
          {props.data.map((item: IDataTopCompanies, index: number) => (
            <StyledTableRow key={index}>
              <TableCell className={clsx(classes.tableCell, classes.fontBold)} scope="row">
                {index + 1}. {item.name}
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                {item.total}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
