import React, { useContext } from "react"
import {
  makeStyles,
  Popover,
  Typography,
  IconButton,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Grid,
} from "@material-ui/core"
import { AddCircle } from "@material-ui/icons"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"

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
    fontWeight: "600",
  },
  reset: {
    color: "#FF9F19",
  },
  wrapper: {
    padding: "5px 15px",
  },
  iconButton: {
    width: "32px",
    height: "32px",
  },
  popover: {
    minWidth: "300px",
  },
})

const ColumnFilter = () => {
  const classes = useStyles()
  const {
    state: { columns },
    setColumns,
  } = useContext(CompaniesContext)

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <>
          <IconButton {...bindTrigger(popupState)}>
            <AddCircle color="primary" className={classes.iconButton} />
          </IconButton>
          <Popover
            classes={{ paper: classes.popover }}
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
              <Typography>Edit Columns</Typography>
            </header>
            <div className={classes.wrapper}>
              <FormControl component="fieldset">
                <FormGroup className={classes.formControl}>
                  <Grid container style={{ width: "60vw" }}>
                    {columns.map(option => (
                      <Grid xs={12} sm={6} md={4} key={option.key} item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={option.selected}
                              color="primary"
                              onChange={() =>
                                setColumns(
                                  columns.map(col =>
                                    col.key === option.key
                                      ? {
                                          ...option,
                                          selected: !option.selected,
                                        }
                                      : col
                                  )
                                )
                              }
                              name={option.key}
                            />
                          }
                          label={option.name}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
              </FormControl>
            </div>
          </Popover>
        </>
      )}
    </PopupState>
  )
}

export default ColumnFilter
