import React, { useEffect } from "react"
import {
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table"
import {
  makeStyles,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  Container,
} from "@material-ui/core"
import Pagination from "material-ui-flat-pagination"

import ColumnFilter from "./ColumnFilter"

const useStyles = makeStyles({
  paper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pagination: {},
  pages: {
    display: "flex",
    padding: "21px 0px 21px 32px",
  },
  currentPage: {
    fontWeight: "bold",
  },
  checkboxCell: {
    width: "30px",
  },
  headerCell: {
    textAlign: "center",
  },
  tableCell: {
    textAlign: "left",
  },
  filterCell: {
    width: "60px"
  }
})

const arrayToMap = arr =>
  arr.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})

const SelectTable = ({ columns, data, selectedRows, setSelectedRows }) => {
  const classes = useStyles()

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      getRowId: (row, relativeIndex, parent) => row.i,
      initialState: {
        selectedRowIds: arrayToMap(selectedRows),
      },
      state: {
        selectedRowIds: arrayToMap(selectedRows),
      },
    },
    useSortBy,
    usePagination,
    useRowSelect
  )

  useEffect(() => {
    setSelectedRows(selectedRowIds)
  }, [selectedRowIds])

  return (
    <>
      <Table {...getTableProps()} size="small">
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                return (
                  <TableCell
                    {...column.getHeaderProps()}
                    className={
                      column.id === "selection"
                        ? classes.checkboxCell
                        : classes.tableCell
                    }
                  >
                    {column.render("Header")}
                  </TableCell>
                )
              })}
              <TableCell><ColumnFilter /></TableCell>
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow
                {...row.getRowProps()}
                style={{ backgroundColor: i % 2 === 0 ? "#F8FAFC" : "#FFFFFF" }}
              >
                {row.cells.map(cell => {
                  return (
                    <TableCell
                      {...cell.getCellProps()}
                      className={
                        cell.column.id === "selection"
                          ? classes.checkboxCell
                          : classes.tableCell
                      }
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  )
                })}
                <TableCell className={classes.filterCell}></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Container>
        <TablePagination
          component={"div"}
          className={classes.pagination}
          rowsPerPageOptions={[5, 10, 25]}
          count={rows.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangePage={(e, newPage) => {
            gotoPage(newPage)
          }}
          onChangeRowsPerPage={e => {
            setPageSize(Number(e.target.value))
            gotoPage(0)
          }}
          ActionsComponent={() => {
            return (
              <Pagination
                reduced={true}
                fullWidth={true}
                classes={{
                  root: classes.pages,
                  rootCurrent: classes.currentPage,
                }}
                limit={pageSize}
                offset={pageIndex * pageSize}
                total={rows.length}
                otherPageColor={"inherit"}
                currentPageColor={"inherit"}
                size={"small"}
                onClick={(e, offset) => {
                  gotoPage(offset / pageSize)
                }}
              />
            )
          }}
        />
      </Container>
    </>
  )
}

export default SelectTable
