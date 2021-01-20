import React, { useState, useContext } from "react"
import { makeStyles, Checkbox, Grid, Paper, Tabs } from "@material-ui/core"
import AntTab from "../../shared/AntTab"

import { Context } from "../../../contexts/CompaniesContext"
import SelectTable from "./SelectTable"

const useStyles = makeStyles({
  paper: {
    maxWidth: "350px",
    overflow: "scroll",
  },
  companyWrapper: {
    display: "flex",
    alignItems: "center",
  },
  logoWrapper: {
    width: "24px",
    height: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10px",
  },
  logo: {
    width: "100%",
  },
  checkboxCell: {
    width: "60px",
  },
})

const List = ({ isMobile }) => {
  const classes = useStyles()
  const [selectedTab, setSelectedTab] = useState(0)
  const {
    state: { selectedIndices, filteredCompanies, columns },
    setSelectedCompanies,
    setFilter,
  } = useContext(Context)

  const cols = React.useMemo(
    () => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps, selectedFlatRows }) => (
          <Checkbox
            color="primary"
            {...getToggleAllRowsSelectedProps()}
            indeterminate={
              selectedFlatRows.length > 0 &&
              selectedFlatRows.length < selectedIndices.length
            }
          />
        ),
        Cell: ({ row }) => (
          <Checkbox
            color="primary"
            disabled={!row.original["Current Account"]}
            {...row.getToggleRowSelectedProps()}
          />
        ),
      },
      {
        Header: "Company",
        accessor: "Company",
        Cell: ({ cell: { value, row } }) => (
          <div className={classes.companyWrapper}>
            <div className={classes.logoWrapper}>
              <img
                className={classes.logo}
                src={row.original.logo}
                alt={value}
              />
            </div>
            {value}
          </div>
        ),
      },
      // render all selected columns
      ...columns.filter(c => c.selected).map(col => ({
        Header: col.name,
        accessor: col.key,
        Cell: ({ cell: { value } }) =>
          value || null
      })),
    ],
    [columns]
  )
  const data = React.useMemo(() => filteredCompanies, [filteredCompanies])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={isMobile ? classes.paper : null}>
          <Tabs
            indicatorColor="primary"
            value={selectedTab}
            onChange={(_, v) => {
              setFilter({
                key: "L2 (Bank Type)",
                value:
                  v === 0 ? "All" : v === 1 ? "Challenger Bank" : "NeoBank",
                type: "choice",
              })
              setSelectedTab(v)
            }}
          >
            <AntTab label="All" id={0} />
            <AntTab label="Challenger Banks" id={1} />
            <AntTab label="Neobanks" id={2} />
          </Tabs>
          <SelectTable
            columns={cols}
            data={data}
            selectedRows={selectedIndices}
            setSelectedRows={setSelectedCompanies}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default List
