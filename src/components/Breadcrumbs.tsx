import React, { useContext } from "react"
import {
  Breadcrumbs as MaterialBreadcrumbs,
  Typography,
  Link,
} from "@material-ui/core"
import { NavigateNext } from "@material-ui/icons"

import { Context as TaxonomyContext } from "../contexts/TaxonomyContext"
import useIsMobile from "../hooks/useIsMobile"

// const useStyles = makeStyles({})

const Breadcrumbs = () => {
  // const classes = useStyles()
  const isMobile = useIsMobile()
  const {
    state: { activeNode },
  } = useContext(TaxonomyContext)

  const generateCrumbs: any = (node: any) =>
    node
      ? node.parent
        ? [...generateCrumbs(node.parent), { name: node.data.name, node }]
        : [{ name: node.data.name, node }]
      : [{ name: "Business Line", node: null }]

  if (isMobile) return null
  return (
    <MaterialBreadcrumbs separator={<NavigateNext fontSize="small" />}>
      {generateCrumbs(activeNode).map((crumb: any, i: number) => {
        if (i + 1 === generateCrumbs(activeNode).length)
          return (
            <Typography key={crumb.name} color="textPrimary">
              {crumb.name}
            </Typography>
          )
        else
          return (
            <Link key={crumb.name} onClick={() => {}}>
              {crumb.name}
            </Link>
          )
      })}
    </MaterialBreadcrumbs>
  )
}

export default Breadcrumbs
