import React, { useState, useContext } from "react"
import { makeStyles, Typography, IconButton } from "@material-ui/core"
import { AccountTree } from "@material-ui/icons"

import Map from "./Map"
import List from "./List"
import Atlas from "./Altas"
import Breadcrumbs from "../Breadcrumbs"
import Filters from "./Filters"

import ListIcon from "../../icons/List"
import BubbleIcon from "../../icons/Bubble"
import ChartIcon from "../../icons/Chart"
import SwapIcon from "../../icons/Swap"
import DashboardIcon from "../../icons/Dashboard"
import ExportIcon from "../../icons/Export"

import FCTButton from "../shared/Button/FCTButton"
import MPButtonGroup from "../shared/MPButtonGroup"

import { Context as CompaniesContext } from "../../contexts/CompaniesContext"
import { Context as TaxonomyContext } from "../../contexts/TaxonomyContext"
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    flex: 1,
    display: "flex",
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    background: "#F8FAFC",
    boxShadow: "0px 1px 0px #EBEFF4",
  },
  button: {
    verticalAlign: "baseline",
    marginLeft: "10px",
  },
  subheader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: "10px",
  },
  content: {
    padding: "20px 0px ",
    flex: 1,
    display: "flex",
  },
  iconButton: {
    width: "40px",
    height: "40px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "3%",
  },
  colFlex: {
    display: "flex",
  },
  labels: {
    marginLeft: "10px",
  },
  fullWidth: {
    flex: 1,
  },
  spreader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mobileSpreader: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  mobileNewLine: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
  mobileButtons: {
    marginTop: "10px",
  },
  subtitleText: {
    color: "",
  },
})

const Taxonomy = ({ view, setView, isMobile }: { view: string, setView: any, isMobile: boolean }) => {
  const classes = useStyles()
  const {
    state: { selectedIndices, filteredCompanies },
  } = useContext(CompaniesContext)
  const {
    state: { activeNode },
  } = useContext(TaxonomyContext)
  const [treeOpen, setTreeOpen] = useState(!isMobile)
  const [mapOpen, setMapOpen] = useState(true)
  const buttonDisabled = activeNode?.data?.name !== "Digital Challenger Banks"
  let history = useHistory();

  const onPressComparison = () => {
    history.push("/comparison");
  }

  const onPressAnalytics = () => {
    history.push("/analytics");
  }

  return (
    <div className={classes.root}>
      <div className={classes.navigation}>
        <Breadcrumbs />
        <div className={isMobile ? classes.mobileSpreader : ''}>
          <MPButtonGroup>
            <FCTButton
              variant="outlined"
              color={view === "Bubble" ? "primary" : "default"}
              startIcon={<BubbleIcon />}
              onClick={() => setView("Bubble")}
            >
              {isMobile ? "Bubble" : "Bubble view"}
            </FCTButton>
            <FCTButton
              variant="outlined"
              color={view === "Map" ? "primary" : "default"}
              startIcon={<DashboardIcon />}
              onClick={() => setView("Map")}
              disabled={buttonDisabled}
            >
              {isMobile ? "Map" : "Map view"}
            </FCTButton>
            <FCTButton
              variant="outlined"
              color={view === "List" ? "primary" : "default"}
              startIcon={<ListIcon />}
              onClick={() => setView("List")}
              disabled={buttonDisabled}
            >
              {isMobile ? "List" : "List view"}
            </FCTButton>
          </MPButtonGroup>
          <Filters />
        </div>
      </div>
      <div className={isMobile ? classes.mobileNewLine : classes.subheader}>
        <div className={classes.fullWidth}>
          {view !== "Bubble" ? (
            <>
              <Typography variant="h6">Digital Challenger Banks</Typography>
              <Typography className={classes.subtitleText} variant="subtitle1">
                {filteredCompanies.length} companies
              </Typography>
            </>
          ) : (
            <div className={classes.spreader}>
              <div className={classes.colFlex}>
                {/* <IconButton
                  variant="outlined"
                  className={classes.iconButton}
                  onClick={() => setTreeOpen(!treeOpen)}
                >
                  <AccountTree color="secondary" />
                </IconButton> */}
                <div className={classes.labels}>
                  <Typography variant="h6">
                    {activeNode?.data?.name || "Business Line"}
                  </Typography>
                  <Typography
                    className={classes.subtitleText}
                    variant="subtitle1"
                  >
                    {`${activeNode?.value || 25210} companies`}
                  </Typography>
                </div>
              </div>
              <div>
                <FCTButton
                  variant="outlined"
                  color="default"
                  className={classes.button}
                  startIcon={<DashboardIcon color="secondary" />}
                  onClick={() => setMapOpen(!mapOpen)}
                >
                  {isMobile ? "Companies" : "Top companies"}
                </FCTButton>
              </div>
            </div>
          )}
        </div>
        {view !== "Bubble" && (
          <div className={isMobile ? classes.mobileButtons : ''}>
            <FCTButton
              variant="outlined"
              color="default"
              className={classes.button}
              startIcon={<SwapIcon color="primary" />}
              onClick={onPressComparison}
            >
              Compare ({selectedIndices.length})
            </FCTButton>
            <FCTButton
              variant="outlined"
              color="default"
              className={classes.button}
              startIcon={<ChartIcon color="primary" />}
              onClick={onPressAnalytics}
            >
              Analytics
            </FCTButton>
            {!isMobile && (
              <FCTButton
                variant="outlined"
                color="default"
                className={classes.button}
                startIcon={!isMobile && <ExportIcon color="primary" />}
              >
                Export
              </FCTButton>
            )}
          </div>
        )}
      </div>
      <div className={classes.content}>
        {view === "List" ? (
          <List isMobile={isMobile} />
        ) : view === "Map" ? (
          <Map isMobile={isMobile} />
        ) : (
          <Atlas
            treeOpen={treeOpen}
            setTreeOpen={setTreeOpen}
            mapOpen={mapOpen}
          />
        )}
      </div>
    </div>
  )
}

export default Taxonomy
