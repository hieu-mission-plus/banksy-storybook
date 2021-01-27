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

const Metric = ({ isMobile }: { isMobile: boolean }) => {
  const classes = useStyles()
  const chartArea = useRef<any>(null)
  const [chart, setChart] = useState<any>(null)
  const [chartSet, setChartSet] = useState(false)
  const {
    state: { companies, selectedIndices, capabilities, adaptabilities },
  } = useContext(Context)

  const selectedCompanies = selectedIndices.map((index: any) => companies[index])
  const selectedCapabilities = capabilities.filter((cap: any) => cap.selected)
  const selectedAdaptabilities = adaptabilities.filter((cap: any) => cap.selected)

  useEffect(() => {
    if (!chart) {
      setChart(
        new D32X2(
          chartArea.current,
          selectedCompanies,
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
      const { offsetWidth, offsetHeight } = chartArea?.current?.parentElement
      const margin = isMobile ? 20 : 40
      chart.setDimensions(offsetWidth, offsetHeight, margin)
      setChartSet(true)
    }
  }, [chartArea, chart])

  return <div className={classes.chartWrapper} ref={chartArea}></div>
}

export default Metric
