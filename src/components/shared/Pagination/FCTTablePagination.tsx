import React from 'react'
import TablePagination from '@material-ui/core/TablePagination'
import { makeStyles, createStyles, Theme, MuiThemeProvider } from '@material-ui/core/styles'
import { FCTPagination } from './FCTPagination'
import { PaginationProps } from '@material-ui/lab/Pagination'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import '../../../font/font.css'
import theme from '../../../theme'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 0px 22px 0;
`

const useStyleTablePagination = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginLeft: 19,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        marginRight: 0,
        marginBottom: 10,
      },
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
      },
      '& .MuiTablePagination-toolbar': {
        marginTop: -5,
      },
      '& .MuiTablePagination-actions': {
        display: 'none',
      },
      '& .MuiTablePagination-spacer': {
        position: 'absolute',
        borderRadius: 3,
        height: 40,
        marginLeft: -20,
        border: '1px solid #E7ECF3',
        width: 160,
      },
      '& .MuiSelect-root ': {
        paddingBottom: 4,
        fontFamily: 'Inter',
        fontWeight: 600,
      },
      '& .MuiSvgIcon-root': {
        fontSize: 25,
        fill: '#0F172A',
        marginLeft: 5,
        left: 30,
      },
      '& .MuiTypography-root': {
        fontFamily: 'Inter',
        fontWeight: 400,
      },
    },
  })
)

export function FCTTablePagination(props: FCTTablePaginationProp) {
  const {
    onChangeRowsPerPage,
    rowsPerPageOptions,
    paginationProps,
    totalRows,
    rowsPerPageDefault,
  } = props
  const classesPagination = useStyleTablePagination()
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(rowsPerPageDefault || 10)

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value))
    if (onChangeRowsPerPage) onChangeRowsPerPage(event)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <PaginationContainer>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TablePagination
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              classes={classesPagination}
              component="section"
              labelDisplayedRows={({ count }) => `of ${count} companies`}
              labelRowsPerPage="Displaying "
              count={totalRows || 0}
              SelectProps={{ IconComponent: ExpandMoreIcon }}
              // Unused props
              page={paginationProps.page ? paginationProps.page - 1 : 0}
              onChangePage={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FCTPagination {...paginationProps} />
          </Grid>
        </Grid>
      </PaginationContainer>
    </MuiThemeProvider>
  )
}

interface FCTTablePaginationProp {
  rowsPerPageDefault?: number
  rowsPerPageOptions: number[]
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  totalRows: number
  paginationProps: PaginationProps
}
