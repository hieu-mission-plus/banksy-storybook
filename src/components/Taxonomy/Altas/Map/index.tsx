import React from "react"
import { makeStyles, Grid } from "@material-ui/core"

import MapGrid from "./MapGrid"

const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    flex: 1,
    display: "flex",
  },
})

const Map = ({ imageGroups }: any) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {imageGroups.map((g: any) => g && (
          <MapGrid
            key={g[0]?.category || ""}
            subheader={g[0]?.category || ""}
            companies={g}
          />
        ))}
      </Grid>
    </div>
  )
}

export default Map
