import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  withStyles,
} from "@material-ui/core"

export const AccordionBase = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
    width: "100%",
    
  },
  expanded: {},
})(MuiAccordion)

export const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary)
