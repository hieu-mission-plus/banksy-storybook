import React from "react"
import { Button, withStyles, ButtonProps } from "@material-ui/core"

const MPButton = withStyles(theme => ({
  root: {
    textTransform: "none",
    padding: "8px 20px",
    fontWeight: 400,
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  outlined: {
    backgroundColor: "#ffffff",
    color: "#6C809D",
  },
  outlinedPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      opacity: 1,
    },
  },
}))((props: ButtonProps) => <Button {...props} disableRipple />)

export default MPButton
