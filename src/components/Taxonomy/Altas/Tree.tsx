import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Paper, Typography, AccordionDetails, IconButton } from '@material-ui/core'
import { TreeView, TreeItem } from '@material-ui/lab'
import { ExpandMore, ChevronRight, Close } from '@material-ui/icons'

import { Context } from '../../../contexts/TaxonomyContext'
import { AccordionBase, AccordionSummary } from '../../shared/Accordion'

const useStyles = makeStyles({
  root: {
    flexDirection: 'column',
    flex: 1,
    display: 'flex',
  },
  header: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 15px',
    border: '1px solid #E7ECF3',
    boxSizing: 'border-box',
    fontWeight: 600,
  },
  active: {
    backgroundColor: 'rgb(209, 231, 221)',
    color: '#2B5F4D',
  },
  inactive: {
    backgroundColor: 'white',
    color: 'initial',
  },
})

const Tree = ({ setTreeOpen }: any) => {
  const classes: any = useStyles()
  const {
    state: { tree, activeNode },
  } = useContext(Context)

  const generateCrumbs: any = (node: any) =>
    node
      ? node.parent
        ? [...generateCrumbs(node.parent), { name: node.data.name, node }]
        : [{ name: node.data.name, node }]
      : [{ name: 'Business Line', node: null }]

  const breadcrumbs = generateCrumbs(activeNode).map((b: any) => b.name)
  const bankingOpen = breadcrumbs.includes('Retail Banking')
  const [open, setOpen] = useState(bankingOpen)
  useEffect(() => {
    setOpen(bankingOpen)
  }, [bankingOpen])

  const renderTree = (nodes: any) => {
    const active = breadcrumbs.includes(nodes.name)
    return (
      <TreeItem
        key={nodes.name}
        nodeId={nodes.name}
        label={nodes.name}
        classes={{
          root: active ? classes.active : classes.inactive,
        }}
      >
        {Array.isArray(nodes.children)
          ? nodes.children
              .sort((a: any, b: any) => (a.children ? -1 : 1))
              .map((node: any) => renderTree(node))
          : null}
      </TreeItem>
    )
  }

  return (
    <Paper className={classes.root}>
      <header className={classes.header}>
        <Typography>Business Line</Typography>
        <IconButton onClick={() => setTreeOpen(false)}>
          <Close />
        </IconButton>
      </header>
      <>
        {tree.children
          .sort((a: any, b: any) => (a.children ? -1 : 1))
          .map((node: any) => {
            return (
              <AccordionBase key={node.name} expanded={node.name === 'Retail Banking' && open}>
                <AccordionSummary
                  onClick={() => setOpen(!open)}
                  expandIcon={<ExpandMore />}
                  disabled={!node.children}
                >
                  <Typography className={classes.heading}>{node.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<ChevronRight />}
                    expanded={breadcrumbs}
                  >
                    {node.children
                      ?.sort((a: any, b: any) => (a.children ? -1 : 1))
                      .map((n: any) => renderTree(n)) || null}
                  </TreeView>
                </AccordionDetails>
              </AccordionBase>
            )
          })}
      </>
    </Paper>
  )
}

export default Tree
