import React from "react";
import { Button, withStyles, ButtonProps } from "@material-ui/core";

const BSButton = withStyles((theme) => ({
  root: {
    textTransform: "none",
    padding: "8px 20px",
    fontWeight: 400,
    fontSize: "12px",
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  outlined: {
    backgroundColor: "#ffffff",
    color: "#6C809D",
    border: "1px solid #E2E8F0",
    '&$disabled': {
      background: '#E2E8F0',
      color: '#94A3B8',
      border: '1px solid #E2E8F0',
    }
  },
  outlinedPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      opacity: 1,
    },
  },
  sizeSmall: {
    padding: "6px 12px",
    lineHeight: "18px",
  },
  sizeLarge: {
    padding: "14px 20px",
    fontSize: "14px",
    lineHeight: "22px",
  },
  disabled: {
    background: '#E2E8F0',
    color: '#94A3B8',
    border: '1px solid #E2E8F0',
  }
}))((props: ButtonProps) => (
  <Button
    data-testid={`${props.color === "primary" ? "button-primary" : "button"}`}
    {...props}
    disableRipple
  />
));

export default BSButton;
