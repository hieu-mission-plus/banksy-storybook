import React, { useState } from "react"
import {
  makeStyles,
  Typography,
  Paper,
  IconButton,
  Grid,
} from "@material-ui/core"
import {
  KeyboardArrowLeft,
} from "@material-ui/icons"

import Metric from "./Metric/"
import List from "./List/"
import Filters from "./Filters/"

import MPButton from "../shared/MPButton"
import MPButtonGroup from "../shared/MPButtonGroup"

import DashboardIcon from "../../icons/Dashboard"
import ListIcon from "../../icons/List"

const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    flex: 1,
    display: "flex",
    minWidth: "100%"
  },
  subheader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
  },
  content: {
    paddingBottom: "20px",
    flex: 1,
    display: "flex",
  },
  breadcrumbs: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    height: "100%",
  },
  filters: {
    borderLeft: "1px solid #dddddd",
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  gridWrapper: {
    height: "100%",
    overflow: "scroll",
    minHeight: "300px",
  },
  mobileNewLine: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
  mobileButtons: {
    margin: "10px 0px",
  },
  paper: {
    maxWidth: "350px",
    overflow: "scroll",
  },
  reverse: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  mobileFilters: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
  },
  compareText: {
    color: "#FF9F19",
  },
  titleText: {
    color: "#475569",
  },
})

const Comparison = ({ setRootView, isMobile }) => {
  const classes = useStyles()
  const [view, setView] = useState("Metric")
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className={classes.root}>
      <div className={isMobile ? classes.mobileNewLine : classes.subheader}>
        <div className={classes.breadcrumbs}>
          <IconButton onClick={() => setRootView("Taxonomy")}>
            <KeyboardArrowLeft />
          </IconButton>
          <Typography className={classes.titleText} variant="h6">
            <span className={classes.compareText}>Compare:</span> Retail Banking
          </Typography>
        </div>
        <MPButtonGroup className={isMobile ? classes.mobileButtons : null}>
          <MPButton
            variant="outlined"
            color={view === "Metric" ? "primary" : "default"}
            startIcon={<DashboardIcon />}
            onClick={() => setView("Metric")}
          >
            Metric view
          </MPButton>
          <MPButton
            variant="outlined"
            color={view === "List" ? "primary" : "default"}
            startIcon={<ListIcon />}
            onClick={() => setView("List")}
          >
            List view
          </MPButton>
        </MPButtonGroup>
      </div>
      <div className={classes.content}>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={isMobile ? classes.paper : classes.wrapper}>
              <Grid
                container
                className={isMobile ? classes.reverse : classes.fullHeight}
              >
                <Grid item xs={12} md={9} className={classes.gridWrapper}>
                  {view === "List" ? (
                    <List
                      selectedTab={selectedTab}
                      setSelectedTab={setSelectedTab}
                      setRootView={setRootView}
                      isMobile={isMobile}
                    />
                  ) : (
                    <Metric isMobile={isMobile} />
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  className={isMobile ? classes.mobileFilters : classes.filters}
                >
                  <Filters selectedTab={selectedTab} view={view} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Comparison
