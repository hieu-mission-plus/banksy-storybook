import React, { useContext } from "react"
import {
  makeStyles,
  Popover,
  Typography,
  Button,
} from "@material-ui/core"
import { Replay } from "@material-ui/icons"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"

import FilterIcon from "../../../icons/Filter"
import Accordion from "./Accordion"
import BSButton from "../../shared/Button/BSButton"

import { Context as CompaniesContext } from "../../../contexts/CompaniesContext"

const useStyles = makeStyles({
  button: {
    verticalAlign: "baseline",
    marginLeft: "10px",
  },
  header: {
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 15px",
    border: "1px solid #E7ECF3",
    boxSizing: "border-box",
    fontWeight: 600
  },
  reset: {
    color: "#FF9F19",
  },
  accordionWrapper: {
    padding: "5px 15px",
  },
})

const Filters = () => {
  const classes = useStyles()
  const { resetFilters } = useContext(CompaniesContext)

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <>
          <BSButton
            variant="outlined"
            color="default"
            className={classes.button}
            startIcon={<FilterIcon />}
            {...bindTrigger(popupState)}
          >
            Filter
          </BSButton>
          <Popover
            style={{'width': '300px'}}
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <header className={classes.header}>
              <Typography>Filter</Typography>
              <Button
                className={classes.reset}
                variant="text"
                startIcon={<Replay />}
                onClick={() => resetFilters()}
              >
                Reset
              </Button>
            </header>
            <div className={classes.accordionWrapper}>
              <Accordion />
            </div>
          </Popover>
        </>
      )}
    </PopupState>
  )
}

export default Filters
