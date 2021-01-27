import React, { useContext } from 'react'
import { makeStyles, Divider } from '@material-ui/core'

import { Context } from '../../../contexts/CompaniesContext'
import XCheckboxes from './XCheckboxes'
import YCheckboxes from './YCheckboxes'

const useStyles = makeStyles({
  paper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersWrapper: {
    padding: '20px',
  },
  divider: {
    margin: '15px 0px',
  },
})

const Filters = ({ view, selectedTab }: { view: string; selectedTab: number }) => {
  const classes = useStyles()
  const {
    state: { capabilities, adaptabilities },
    setCapabilities,
    setAdaptabilities,
  } = useContext(Context)

  const scoreAdaps = adaptabilities
    .filter((d: any) => d.scale_type === 'score')
    .map((d: any) => ({ ...d, label: d.name.slice(6) }))

  return (
    <div className={classes.filtersWrapper}>
      {/* {view === "Metric" ? ( */}
      <>
        <XCheckboxes items={capabilities} setItems={setCapabilities} title="X: Capability" />
        <Divider className={classes.divider} />
        <YCheckboxes items={scoreAdaps} setItems={setAdaptabilities} title="Y: Scale" />
      </>
      {/* ) : selectedTab === 0 ? (
        <XCheckboxes
          items={capabilities}
          setItems={setCapabilities}
          title="X: Capability"
        />
      ) : (
        <YCheckboxes
          items={scoreAdaps}
          setItems={setAdaptabilities}
          title="Y: Scale"
        />
      )} */}
    </div>
  )
}

export default Filters
