import React from "react"
import {
  Tab,
  withStyles,
} from "@material-ui/core"

const AntTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    color: "#6C809D",
    "&:hover": {
      opacity: 1,
    },
    "&$selected": {
      color: "#1E293B",
    },
    "&:focus": {
      color: "#1E293B",
    },
    minWidth: "0",
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />)

export default AntTab