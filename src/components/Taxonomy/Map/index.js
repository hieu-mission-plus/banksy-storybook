import React, { useContext } from "react"
import { makeStyles, Grid } from "@material-ui/core"

import MapGrid from "./MapGrid"
import { Context as CompaniesContext } from "../../../contexts/CompaniesContext"
import { Context as TaxonomyContext } from "../../../contexts/TaxonomyContext"

const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    flex: 1,
    display: "flex",
  },
})

const Map = (props) => {
  const classes = useStyles()
  const {
    state: { activeNode, tree },
  } = useContext(TaxonomyContext)
  const {
    state: { logos },
  } = useContext(CompaniesContext)

  const root = activeNode || tree

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {root.children.map(node => (
          <MapGrid
            key={node.data?.name || node.name}
            subheader={node.data?.name || node.name}
            companies={logos.get(node.data?.name || node.name)}
          />
        ))}
      </Grid>
    </div>
  )
}

export default Map
