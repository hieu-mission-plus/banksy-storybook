import React, { useState } from "react"
import {
  makeStyles,
  Typography,
  IconButton,
  TextField,
} from "@material-ui/core"
import { KeyboardArrowLeft } from "@material-ui/icons"

import Metric from "./Metric"
import MPButton from "../shared/MPButton"
import ExportIcon from "../../icons/Export"
import Breadcrumbs from "../Breadcrumbs"

const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    flex: 1,
    display: "flex",
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
  textField: {
    backgroundColor: "white",
    marginLeft: "10px",
  },
  button: {
    verticalAlign: "baseline",
    marginLeft: "10px",
  },
  buttonBorder: {
    border: "1px solid rgba(0, 0, 0, 0)",
  },
  mobileNewLine: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
  mobileDatepickers: {
    margin: "10px 0px",
  },
  mobileTextField: {
    width: "50%",
    backgroundColor: "white",
  },
  titleText: {
    color: "#475569",
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    background: "#F8FAFC",
    boxShadow: "0px 1px 0px #EBEFF4",
  },
})

const Analytics = ({ setRootView, isMobile }) => {
  const classes = useStyles()
  const [yValue, setYValue] = useState("Amount")
  const [gValue, setGValue] = useState("ReportRegion1")
  const [fromDate, setFromDate] = useState("2014-01-01")
  const [toDate, setToDate] = useState("2021-01-01")

  return (
    <div className={classes.root}>
      <div className={classes.navigation}>
        <Breadcrumbs />
      </div>
      <div className={isMobile ? classes.mobileNewLine : classes.subheader}>
        <div className={classes.breadcrumbs}>
          <IconButton onClick={() => setRootView("Taxonomy")}>
            <KeyboardArrowLeft />
          </IconButton>
          <Typography className={classes.titleText} variant="h6">
            {`${
              yValue === "Amount" ? "Equity funding" : "Number of companies"
            } by ${gValue === "ReportRegion1" ? "region" : "investment stage"}`}
          </Typography>
        </div>
        <div className={isMobile ? classes.mobileDatepickers : null}>
          <TextField
            size="small"
            type="date"
            label="Date from"
            variant="outlined"
            value={fromDate}
            className={isMobile ? classes.mobileTextField : classes.textField}
            inputProps={{ className: classes.buttonBorder }}
            onChange={e => setFromDate(e.target.value)}
          />
          <TextField
            size="small"
            type="date"
            label="Date to"
            variant="outlined"
            value={toDate}
            className={isMobile ? classes.mobileTextField : classes.textField}
            inputProps={{ className: classes.buttonBorder }}
            onChange={e => setToDate(e.target.value)}
          />
          {!isMobile && (
            <MPButton
              variant="outlined"
              color="default"
              className={classes.button}
              startIcon={<ExportIcon color="primary" />}
            >
              Export
            </MPButton>
          )}
        </div>
      </div>
      <div className={classes.content}>
        <Metric
          yValue={yValue}
          setYValue={setYValue}
          gValue={gValue}
          setGValue={setGValue}
          fromDate={fromDate}
          toDate={toDate}
          isMobile={isMobile}
        />
      </div>
    </div>
  )
}

export default Analytics
