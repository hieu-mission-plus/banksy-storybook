import React, { useContext } from "react"
import { Grid } from "@material-ui/core"

import Map from "./Map"
import Bubble from "./Bubble"
// import Tree from "./Tree"
import { Context as TaxonomyContext } from "../../../contexts/TaxonomyContext"
import { Context as CompaniesContext } from "../../../contexts/CompaniesContext"

const Atlas = ({ treeOpen, setTreeOpen, mapOpen }: { treeOpen: boolean, setTreeOpen: any, mapOpen: boolean }) => {
  const {
    state: { activeNode, tree },
  } = useContext(TaxonomyContext)
  const {
    state: { logos },
  } = useContext(CompaniesContext)

  const root = activeNode || tree
  const activeName = root?.data?.name || root.name
  const imageGroups =
    activeName && activeName !== "Business Line"
      ? root.children.map((d: any) => logos.get(d.data.name))
      : []

  const showMap = mapOpen && !!imageGroups.length
  const bubbleGridSize = 8
  // const bubbleGridSize = 6 + (mapOpen ? 0 : 3) + (treeOpen ? 0 : 3)

  return (
    <Grid container spacing={3} justify="center">
      {/* {treeOpen && (
        <Grid item xs={12} md={3}>
          <Tree setTreeOpen={setTreeOpen} />
        </Grid>
      )} */}
      <Grid item xs={12} md={bubbleGridSize}>
        <Bubble />
      </Grid>
      {showMap && (
        <Grid item xs={12} md={4}>
          <Map imageGroups={imageGroups} />
        </Grid>
      )}
    </Grid>
  )
}

export default Atlas
