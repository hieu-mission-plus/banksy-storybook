import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import { Profile } from './Sidebar/Profile'
import { CompanyInformation } from './Sidebar/CompanyInformation'
import { CategoriesTags } from './Sidebar/CategoriesTags'
import { TopCompanies } from './Sidebar/TopCompanies'
import { dataCategoriesTags, dataCompanyInformation, dataProfileAvatar, dataTopCompanies } from './Sidebar/shared/DataMock'

const useStyles = makeStyles({
  root: {
    padding: 16,
    paddingRight: 18,
    margin: 'auto',
    maxWidth: 400,
    borderRadius: 5,
    boxSizing: 'border-box',
    border: '1px solid #E7ECF3',
    boxShadow: '0px 3px 4px rgba(148, 163, 184, 0.05)',
    background: 'linear-gradient(180deg, rgba(51,65,85,1) 60px, rgba(255,255,255,1) 60px)',
  },
})

const Sidebar = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Profile data={dataProfileAvatar}></Profile>
      <CompanyInformation data={dataCompanyInformation}></CompanyInformation>
      <CategoriesTags data={dataCategoriesTags}></CategoriesTags>
      <TopCompanies data={dataTopCompanies}></TopCompanies>
    </Paper>
  )
}

export default Sidebar
