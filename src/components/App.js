import React, { useState, useEffect, useContext } from "react"
import { Container, makeStyles } from "@material-ui/core"
import { csv, groups, group } from "d3"

import Header from "./Header"
import Taxonomy from "./Taxonomy"
import Comparison from "./Comparison"
import Analytics from "./Analytics"
import Profile from "./Profile"

import { Context as FundingContext } from "../contexts/FundingContext"
import { Context as CompaniesContext } from "../contexts/CompaniesContext"

import funding from "../data/funding.csv"
import comparison from "../data/comparison.csv"
import headers from "../data/comparison_headers.csv"
import map_logos from "../data/map_logos.csv"
import companies from "../data/companies.csv"
import useIsMobile from "../hooks/useIsMobile"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    display: "flex",
  },
})

const App = () => {
  const classes = useStyles()
  const [rootView, setRootView] = useState("Taxonomy")
  const [taxonomyView, setTaxonomyView] = useState("Bubble")
  const { setFundingData } = useContext(FundingContext)
  const { setCompaniesData, setAdaptabilities, setCapabilities, setLogos } = useContext(
    CompaniesContext
  )
  const isMobile = useIsMobile()
  useEffect(() => {
    const datasets = [
      csv(funding),
      csv(companies),
      csv(comparison),
      csv(headers),
      csv(map_logos)
    ]
    Promise.all(datasets).then(
      ([funding, companies, comparison, headers, map_logos]) => {
        const labeledHeaders = headers
          .map(h =>
            h.category === "Products" || h.category === "Features"
              ? { ...h, type: "adapt" }
              : h.category === "Scale"
              ? { ...h, type: "score" }
              : h
          )
          .filter(d => d.type)
        const [caps, adapts] = groups(labeledHeaders, h => h.type)
        setLogos(group(map_logos, l => l.category))
        setFundingData(funding)
        setCompaniesData(companies, comparison)
        setAdaptabilities(adapts[1].map(a => ({ ...a, selected: true })))
        setCapabilities(caps[1].map(c => ({ ...c, selected: true })))
      }
    )
  }, [])

  return (
    <div className={classes.root}>
      <Header setRootView={setRootView} setTaxonomyView={setTaxonomyView} />
      <Container className={classes.content} maxWidth="xl">
        {rootView === "Taxonomy" && (
          <Taxonomy
            setRootView={setRootView}
            view={taxonomyView}
            setView={setTaxonomyView}
            isMobile={isMobile}
          />
        )}
        {rootView === "Comparison" && (
          <Comparison isMobile={isMobile} setRootView={setRootView} />
        )}
        {rootView === "Analytics" && (
          <Analytics isMobile={isMobile} setRootView={setRootView} />
        )}
        {rootView === "Profile" && <Profile setRootView={setRootView} />}
      </Container>
    </div>
  )
}

export default App
