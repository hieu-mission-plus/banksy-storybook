import React, { useRef, useState, useEffect, useContext } from "react"
import { makeStyles } from "@material-ui/core"

import { Context } from "../../../contexts/CompaniesContext"
import D32X2 from "./2X2.d3"

const useStyles = makeStyles({
  chartWrapper: {
    flex: 1,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    height: "100%"
  },
})

const Metric = ({ isMobile }) => {
  const classes = useStyles()
  const chartArea = useRef(null)
  const [chart, setChart] = useState(null)
  const [chartSet, setChartSet] = useState(null)
  const {
    state: { companies, selectedIndices, capabilities, adaptabilities },
  } = useContext(Context)

  const selectedCompanies = selectedIndices.map(index => companies[index])
  const selectedCapabilities = capabilities.filter(cap => cap.selected)
  const selectedAdaptabilities = adaptabilities.filter(cap => cap.selected)

  useEffect(() => {
    if (!chart) {
      setChart(
        new D32X2(
          chartArea.current,
          selectedCompanies,
          selectedCapabilities,
          selectedAdaptabilities
        )
      )
    } else {
      if (chartSet) {
        chart.update(
          selectedCompanies,
          selectedCapabilities,
          selectedAdaptabilities
        )
      }
    }
  }, [chart, selectedCompanies, selectedCapabilities, selectedAdaptabilities])

  // set width/height
  useEffect(() => {
    if (chartArea && chart) {
      const { offsetWidth, offsetHeight } = chartArea.current.parentElement
      const margin = isMobile ? 20 : 40
      chart.setDimensions(offsetWidth, offsetHeight, margin)
      setChartSet(true)
    }
  }, [chartArea, chart])

  return <div className={classes.chartWrapper} ref={chartArea}></div>
}

export default Metric
