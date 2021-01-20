import React from "react"
import {
  makeStyles,
  Grid,
  Paper,
  GridList,
  GridListTile,
  ListSubheader,
  Button,
} from "@material-ui/core"

const useStyles = makeStyles({
  paper: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: "#f8fafc",
    flex: 1,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "60%",
    padding: "10px",
  },
})

const MapGrid = ({ subheader, companies }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <GridList
          cellHeight={90}
          cols={3}
          className={classes.gridList}
          spacing={5}
        >
          <GridListTile cols={3} style={{ height: "auto" }}>
            <ListSubheader component="div">{`Top in ${subheader}`}</ListSubheader>
          </GridListTile>
          {companies.map(tile => (
            <GridListTile key={tile.company}>
              <div className={classes.imageContainer}>
                <Button>
                  <img
                    className={classes.image}
                    src={tile.src}
                    alt={tile.company}
                  />
                </Button>
              </div>
            </GridListTile>
          ))}
        </GridList>
      </Paper>
    </Grid>
  )
}

export default MapGrid
