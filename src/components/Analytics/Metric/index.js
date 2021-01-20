import React, { useRef, useState, useEffect, useContext } from "react"
import {
  makeStyles,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core"

import StackedBar from "./StackedBar.d3"
import { Context } from "../../../contexts/FundingContext"

const useStyles = makeStyles({
  wrapper: {
    flex: 1,
    height: "100%",
  },
  paper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fullHeight: {
    height: "100%",
  },
  chartWrapper: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
  filters: {
    borderLeft: "1px solid #dddddd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    padding: "40px 20px",
  },
  formControl: {
    marginBottom: "20px",
  },
  paper: {},
  mobileButtons: {
    margin: "10px 0px",
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
  gridWrapper: {
    height: "100%",
    overflow: "scroll",
    minHeight: "300px",
  },
})

const Metric = ({
  yValue,
  setYValue,
  gValue,
  setGValue,
  fromDate,
  toDate,
  isMobile,
}) => {
  const classes = useStyles()
  const chartArea = useRef(null)
  const [chart, setChart] = useState(null)
  const [chartSet, setChartSet] = useState(null)
  const {
    state: { funding },
  } = useContext(Context)
  const [xValue, setXValue] = useState("FundingYear")

  useEffect(() => {
    if (!chart) {
      setChart(new StackedBar(chartArea.current, funding))
    } else {
      if (chartSet) {
        chart.update(funding, yValue, gValue, fromDate, toDate)
      }
    }
  }, [chart, chartSet, funding, yValue, gValue, fromDate, toDate])

  // set width/height
  useEffect(() => {
    if (chartArea && chart) {
      const { offsetWidth, offsetHeight } = chartArea.current.parentElement
      const margin = isMobile ? 30 : 70
      chart.setDimensions(offsetWidth, offsetHeight, margin)
      setChartSet(true)
    }
  }, [chartArea, chart])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={isMobile ? classes.paper : classes.wrapper}>
          <Grid container className={classes.fullHeight}>
            <Grid item xs={12} md={9} className={classes.gridWrapper}>
              <div className={classes.chartWrapper} ref={chartArea}></div>
            </Grid>
            <Grid item xs={12} md={3} className={classes.filters}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="capability">
                  Capability (x-axis)
                </InputLabel>
                <Select
                  native
                  value={xValue}
                  onChange={e => setXValue(e.target.value)}
                  label="Capability (x-axis)"
                  inputProps={{
                    name: "capability",
                    id: "capability",
                  }}
                  disabled
                >
                  <option value={"FundingYear"}>Funding Year</option>
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="adaptability">
                  Adaptability (y-axis)
                </InputLabel>
                <Select
                  native
                  value={yValue}
                  onChange={e => setYValue(e.target.value)}
                  label="Adaptability (y-axis)"
                  inputProps={{
                    name: "adaptability",
                    id: "adaptability",
                  }}
                >
                  <option value={"Amount"}>Funding Amount</option>
                  <option value={"number"}>Number of Companies</option>
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="grouping">Series</InputLabel>
                <Select
                  native
                  value={gValue}
                  onChange={e => setGValue(e.target.value)}
                  label="Series"
                  inputProps={{
                    name: "grouping",
                    id: "grouping",
                  }}
                >
                  <option value={"ReportRegion1"}>Region</option>
                  <option value={"ExpandRound2"}>Investment Stage</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Metric
