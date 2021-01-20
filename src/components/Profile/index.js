import React from "react"
import {
  makeStyles,
  Grid,
} from "@material-ui/core"

import Sidebar from "./Sidebar"
import Navigation from "./Navigation"

const useStyles = makeStyles({
  root: {
    flex: 1,
    paddingTop: "20px"
  }
})

const Profile = ({ setRootView }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={8}>
          <Navigation setRootView={setRootView} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Profile
