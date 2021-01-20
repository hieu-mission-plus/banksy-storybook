import React from "react"
import { ButtonGroup, withStyles } from "@material-ui/core"

// basically the same as MUI group - only if we need to 
// further the styling
const MPButtonGroup = withStyles(theme => ({}))(props => (
  <ButtonGroup {...props} />
))

export default MPButtonGroup
