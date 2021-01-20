import React, { useState, useContext } from "react"
import {
  makeStyles,
  Paper,
  Typography,
  Tabs,
  Breadcrumbs,
} from "@material-ui/core"
import { NavigateNext, Home } from "@material-ui/icons"

import AntTab from "../shared/AntTab"
import overview from "../../images/profile/overview.svg"
import use_case from "../../images/profile/use_case.svg"
import partnerships from "../../images/profile/partnerships.svg"
import news from "../../images/profile/news.svg"

import useIsMobile from "../../hooks/useIsMobile"

const useStyles = makeStyles({
  padding: {
    border: "4px solid #f8fafc",
    boxSizing: "border-box",
  },
  root: {
    flexDirection: "column",
    flex: 1,
    display: "flex",
    width: "100%",
    border: "1px solid #E7ECF3",
    boxSizing: "border-box",
  },
  breadcrumbsContainer: {
    borderBottom: "1px solid #E7ECF3",
    padding: "10px",
  },
  breadcrumbs: {
    display: "flex",
    alignItems: "center",
  },
  homeIcon: {
    display: "flex",
    "&:hover": {
      cursor: "pointer",
    },
  },
  comparisonText: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  spreader: {
    display: "flex",
    padding: "0px 10px",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "100%",
  },
  title: {
    fontSize: "18px",
    minWidth: "100px",
    fontWeight: "600",
  },
  tabs: {
    flexShrink: 1,
  },
  section: {
    paddingTop: "10px",
    width: "100%",
  },
})

const Navigation = ({ setRootView }) => {
  const classes = useStyles()
  const [selectedTab, setSelectedTab] = useState(0)
  const isMobile = useIsMobile()
  const options = [overview, null, use_case, partnerships, news]

  return (
    <>
      <div className={classes.padding}>
        <Paper className={classes.root} elevation={0}>
          <div className={classes.breadcrumbsContainer}>
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              className={classes.breadcrumbs}
            >
              <Home
                classes={{ root: classes.homeIcon }}
                onClick={() => setRootView("Taxonomy")}
              />
              <Typography
                className={classes.comparisonText}
                onClick={() => setRootView("Comparison")}
              >
                Comparison
              </Typography>
              <Typography>Up Bank</Typography>
            </Breadcrumbs>
          </div>
          <div className={classes.spreader}>
            <Typography className={classes.title} variant="h4">
              Up Bank
            </Typography>
            <Tabs
              className={classes.tabs}
              indicatorColor="primary"
              value={selectedTab}
              onChange={(_, v) => setSelectedTab(v)}
              variant="scrollable"
              scrollButtons="off"
              style={{ width: isMobile ? "250px" : "auto" }}
            >
              <AntTab label="Overview" id={0} />
              <AntTab label="Traction" id={1} disabled />
              <AntTab label="Use Case" id={2} />
              <AntTab label="Partnerships" id={3} />
              <AntTab label="News" id={4} />
            </Tabs>
          </div>
        </Paper>
      </div>
      <img className={classes.section} src={options[selectedTab]} />
    </>
  )
}

export default Navigation
