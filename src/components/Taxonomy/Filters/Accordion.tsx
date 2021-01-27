import React, { useContext } from "react"
import {
  makeStyles,
  Typography,
  AccordionDetails,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"

import { Context as CompaniesContext } from "../../../contexts/CompaniesContext"
import { AccordionBase, AccordionSummary } from "../../shared/Accordion"

const useStyles = makeStyles({
  button: {
    verticalAlign: "baseline",
    marginLeft: "10px",
  },
  formControl: {
    maxHeight: "300px",
    overflow: "scroll",
    flexWrap: "nowrap",
  },
  activeNumber: {
    color: "#29BA74",
    paddingLeft: "5px",
    fontWeight: 600,
  },
})

const Accordion = () => {
  const classes: any = useStyles()
  const {
    state: { filters },
    setFilter,
  } = useContext(CompaniesContext)

  return (
    <>
      {filters
        .filter((f: any) => f.display)
        .map((filter: any) => {
          return (
            <AccordionBase key={filter.name}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography className={classes.heading}>
                  {filter.name}
                  <span className={classes.activeNumber}>
                    {filter.values.filter((v: any) => v.selected).length > 0 &&
                      filter.values.filter((v: any) => v.selected).length}
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl component="fieldset">
                  <FormGroup className={classes.formControl}>
                    {filter.values.map((option: any) => (
                      <FormControlLabel
                        key={option.key}
                        control={
                          <Checkbox
                            checked={option.selected}
                            color="primary"
                            onChange={() =>
                              setFilter({
                                ...filter,
                                values: filter.values.map((o: any) =>
                                  o.key === option.key
                                    ? { ...option, selected: !option.selected }
                                    : o
                                ),
                              })
                            }
                            name={option.name}
                          />
                        }
                        label={option.name}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            </AccordionBase>
          )
        })}
    </>
  )
}

export default Accordion
