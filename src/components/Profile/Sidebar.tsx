import React from "react"
import {
  makeStyles,
} from "@material-ui/core"

import sidebar from "../../images/profile/sidebar.svg"

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    flex: 1,
    position: "relative",
  },
  background: {
    backgroundColor: "#334155",
    height: "60px",
    width: "100%",
    position: "absolute",
    top: "0",
    left: "0",
  },
  content: {
    zIndex: 1000,
    padding: "20px",
  },
  sidebar: {
    width: "100%"
  }
})

const Sidebar = () => {
  const classes: any = useStyles()

  return (
      <img className={classes.sidebar} src={sidebar} alt="Upbank logo" />
  )
}

export default Sidebar
