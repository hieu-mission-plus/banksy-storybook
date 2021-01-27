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
    fontWeight: 500,
    color: "#1E293B",
    marginBottom: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 400,
    color: "#1E293B",
  },
  subheading: {
    color: "#6C809D",
  },
})

interface Props {
  items: any[];
  setItems: any;
  title: string;
}

const XCheckboxes = ({ items, setItems, title }: Props) => {
  const classes: any = useStyles()

  const groupedItems = groups(items, (d: any) => d.category).sort((a, b) =>
    a[0] < b[0] ? 1 : -1
  )

  return (
    <FormControl className={classes.formControl} component="fieldset">
      <Typography className={classes.heading} variant="h6">
        X: Capability
      </Typography>
      <FormGroup>
        {groupedItems.map(([name, values]: any) => (
          // <div key={name}>
          //   {values.map(option => (
          <FormControlLabel
            key={name}
            className={classes.label}
            control={
              <Checkbox
                color="primary"
                checked={values[0]?.selected}
                onChange={() =>
                  setItems([
                    ...items.filter((d: any) => d.category !== name),
                    ...values.map((cap: any) => ({ ...cap, selected: !cap.selected })),
                  ])
                }
                name={name}
              />
            }
            label={name}
          />
          //   ))}
          // </div>
        ))}
      </FormGroup>
    </FormControl>
  )
}

export default XCheckboxes
