import React from "react"
import { useTable } from "react-table"
import {
  makeStyles,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core"
import { useHistory } from "react-router-dom";

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
  thCell: {
    textAlign: "center",
  },
  tableCell: {
    textAlign: "center",
    borderTop: "1px solid rgba(224, 224, 224, 1)",
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
  },
  clickableRow: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  productCell: {
    textAlign: "left",
  },
  table: { width: "auto", tableLayout: "auto", minWidth: "100%" },
})

const SelectTable = ({ columns, data }: { columns: any[], data: any }) => {
  const classes = useStyles()

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })
  
  let history = useHistory();

  const onPressProfile = () => {
    history.push("/profile");
  }
  const onPressTaxonomy = () => {
    history.push("/");
  }
  return (
    <>
      <Table
        {...getTableProps()}
        size="medium"
        stickyHeader={false}
        className={classes.table}
      >
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...column.getHeaderProps()}
                  className={
                    column.id === "Company"
                      ? classes.productCell
                      : classes.tableCell
                  }
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow
                {...row.getRowProps()}
                onClick={onPressProfile}
                className={classes.clickableRow}
                style={{ backgroundColor: i % 2 === 0 ? "#F8FAFC" : "#FFFFFF" }}
              >
                {row.cells.map(cell => (
                  <TableCell
                    {...cell.getCellProps()}
                    className={
                      cell.column.id === "Company"
                        ? classes.productCell
                        : classes.tableCell
                    }
                  >
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default SelectTable
