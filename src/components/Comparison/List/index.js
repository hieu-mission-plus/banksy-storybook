import React, { useContext } from "react"
import { makeStyles, Tabs } from "@material-ui/core"
import { Check } from "@material-ui/icons"
import { groups } from "d3"

import { Context } from "../../../contexts/CompaniesContext"
import Table from "./Table"
import AntTab from "../../shared/AntTab"

const useStyles = makeStyles({
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
})

const List = ({ selectedTab, setSelectedTab, setRootView }) => {
  const classes = useStyles()
  const {
    state: { companies, selectedIndices, capabilities, adaptabilities },
  } = useContext(Context)

  const selectedCompanies = selectedIndices.map(index => companies[index])
  const selectedCapabilities = capabilities.filter(cap => cap.selected)
  const selectedAdaptabilities = adaptabilities.filter(cap => cap.selected)

  const textAdaps = selectedAdaptabilities
    .filter(d => d.scale_type === "score")
    .map(d => ({ ...d, label: d.name.slice(6) }))

  const columns = React.useMemo(() => {
    const selectedItems = selectedTab === 0 ? selectedCapabilities : textAdaps
    const reducer = d =>
      (selectedItems.reduce((acc, curr) => {
        return (
          Number(d[`Score_${curr.label}`]) + acc || Number(d[curr.name]) + acc
        )
      }, 0) /
        selectedItems.length) *
        (selectedItems[0]?.type === "score" ? 1 : 5) || 2.5

    const renderRows =
      selectedTab === 0
        ? groups(selectedItems, d => d.category).map(([label, values]) => ({
            Header: label,
            columns: [
              // hack to get around data issue. Would be easier if it came as a JSON
              ...values.map(cap => ({
                Header: cap.label || cap.name,
                accessor: cap.label ? `Scale_${cap.label}` : cap.name,
                Cell: ({ cell: { value } }) =>
                  value === "1" ? <Check color="primary" /> : value || null,
              })),
            ],
          }))
        : selectedItems.map(cap => ({
            Header: cap.label || cap.name,
            accessor: cap.label ? `Scale_${cap.label}` : cap.name,
            Cell: ({ cell: { value } }) =>
              value === "1" ? <Check color="primary" /> : value || null,
          }))

    return [
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
      {
        Header: "Score",
        accessor: d => reducer(d).toFixed(1),
      },
      ...renderRows
    ]
  }, [selectedCapabilities, textAdaps, selectedTab])
  const data = React.useMemo(() => selectedCompanies, [selectedCompanies])

  return (
    <>
      <Tabs
        indicatorColor="primary"
        value={selectedTab}
        onChange={(_, v) => setSelectedTab(v)}
      >
        <AntTab label="Capability (x-axis)" id={0} />
        <AntTab label="Scale (y-axis)" id={1} />
      </Tabs>
      <Table columns={columns} data={data} setRootView={setRootView} />
    </>
  )
}

export default List
