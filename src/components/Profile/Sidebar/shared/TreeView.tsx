import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import { ITreeView } from '../CategoriesTags'
import { Link } from '@material-ui/core'

interface IPropsTreeView {
  data: ITreeView | string
}

const useStyles = makeStyles({
  root: {
    marginTop: -12,
    marginLeft: -23,
  },
  span: {
    height: 20,
    width: 8,
    borderLeft: '1px solid #CBD5E1',
    borderBottom: '1px solid #CBD5E1',
    marginLeft: 8,
    position: 'absolute',
    top: 0,
  },
  parent: {
    fontSize: 14,
  },
})

const MultiSelectTreeView = withStyles(theme => ({
  '@global': {
    '.MuiTreeItem-content': {
      position: 'relative',
    },
    '.MuiTreeItem-label': {
      paddingTop: 12,

      color: '#29BA74',
      fontSize: 12,
    },
  },
}))((props: IPropsTreeView) => {
  let expanded: string[] = []
  const classes = useStyles()
  const renderTree = (nodes: ITreeView | string) => {
    if (typeof nodes === 'string') return nodes
    expanded.push(String(nodes.id))
    return (
      <TreeItem
        key={nodes.id}
        nodeId={String(nodes.id)}
        style={{ pointerEvents: 'none' }}
        label={<span className={!nodes.id ? classes.parent : ''}>{nodes.name}</span>}
        collapseIcon={!nodes.id ? <span /> : null}
        expandIcon={!nodes.id ? <span /> : null}
      >
        {' '}
        {Array.isArray(nodes.children)
          ? nodes.children.map((node: ITreeView) => renderTree(node))
          : null}
      </TreeItem>
    )
  }
  return (
    <Link href="#">
      <TreeView
        className={classes.root}
        defaultExpanded={expanded}
        defaultCollapseIcon={<span className={classes.span} />}
        defaultExpandIcon={<span className={classes.span} />}
        multiSelect
      >
        {renderTree(props.data)}
      </TreeView>
    </Link>
  )
})

export default MultiSelectTreeView
