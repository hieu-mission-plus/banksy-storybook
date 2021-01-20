import React, { useRef, useState, useEffect, useContext } from "react"
import { makeStyles } from "@material-ui/core"

import D3Bubble from "./Sunburst.d3"
import { Context } from "../../../../contexts/TaxonomyContext"

const useStyles = makeStyles({
  wrapper: {
    flex: 1,
  },
  chartArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
})

const Bubble = () => {
  const classes = useStyles()
  const chartArea = useRef(null)
  const [chart, setChart] = useState(null)
  const [chartSet, setChartSet] = useState(null)
  const {
    state: { tree, activeNode },
    setActiveNode,
  } = useContext(Context)

  useEffect(() => {
    if (!chart) {
      setChart(new D3Bubble(chartArea.current, tree, activeNode, setActiveNode))
    } else {
      if (chartSet) {
        chart.update(tree)
      }
    }
  }, [chart, tree])

  // set width/height
  useEffect(() => {
    if (chartArea && chart) {
      const { offsetWidth, offsetHeight } = chartArea.current.parentElement
      chart.setDimensions(offsetWidth, offsetHeight)
      setChartSet(true)
    }
  }, [chartArea, chart])

  return (
    <div className={classes.wrapper}>
      <div className={classes.chartArea} ref={chartArea}></div>
    </div>
  )
}

export default Bubble
