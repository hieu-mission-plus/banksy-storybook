import React from "react"
import {
  makeStyles,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@material-ui/core"

import { groups } from "d3"

const useStyles = makeStyles({
  paper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#1E293B",
  },
  subheading: {
    color: "#6C809D",
  },
})

const YCheckboxes = ({ items, setItems, title }) => {
  const classes = useStyles()

  const groupedItems = groups(items, d => d.category)

  return (
    <FormControl className={classes.formControl} component="fieldset">
      <Typography className={classes.heading} variant="h6">
        {title}
      </Typography>
      {groupedItems.map(([name, values]) => (
        <div key={name}>
          <FormGroup>
            {values.map(option => (
              <FormControlLabel
                key={option.name}
                className={classes.label}
                control={
                  <Checkbox
                    color="primary"
                    checked={option.selected}
                    onChange={() =>
                      setItems(
                        items.map(cap =>
                          cap.name === option.name
                            ? { ...option, selected: !option.selected }
                            : cap
                        )
                      )
                    }
                    name={option.name}
                  />
                }
                label={option.label || option.name}
              />
            ))}
          </FormGroup>
        </div>
      ))}
    </FormControl>
  )
}

export default YCheckboxes
