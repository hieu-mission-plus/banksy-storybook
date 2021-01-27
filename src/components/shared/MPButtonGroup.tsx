import React from "react"
import { ButtonGroup, withStyles, Theme, ButtonGroupProps } from "@material-ui/core"

// basically the same as MUI group - only if we need to 
// further the styling
const MPButtonGroup = withStyles((theme: Theme) => ({}))((props: ButtonGroupProps) => (
  <ButtonGroup {...props} />
))

export default MPButtonGroup
