import React, { useContext, useState, useEffect } from "react"
import { Container, makeStyles, InputBase } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import Autocomplete from "@material-ui/lab/Autocomplete"
import parse from "autosuggest-highlight/parse"
import match from "autosuggest-highlight/match"

import logo from "../images/fct-logo.svg"
import { Context as CompaniesContext } from "../contexts/CompaniesContext"
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: "#ffffff",
    height: "60px",
    boxShadow: "0px 1px 0px #EBEFF4",
  },
  spreader: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "37px",
    marginBottom: 0,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#EAF8F1",
    marginLeft: theme.spacing(2),
    width: "auto",
  },
  searchIcon: {
    padding: "0px 10px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
  },
  endAdornment: {
    right: 10,
  },
  autocomplete: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "450px",
    },
  },
  input: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
  },
}))

const Header = ({ setTaxonomyView }: any) => {
  const classes = useStyles()
  const {
    state: { companies },
    setFilter,
  } = useContext(CompaniesContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [options, setOptions] = useState<any>(null)
  let history = useHistory();

  const onPressProfile = () => {
    history.push("/profile");
  }
  const onPressTaxonomy = () => {
    history.push("/");
  }
  

  useEffect(() => {
    if (comps.map(b => b.name).includes(searchTerm)) {
      onPressProfile()
    } else if (businessLines.map(b => b.name).includes(searchTerm)) {
      setOptions([
        ...region1s.map((region: any) => ({
          name: `${searchTerm} in ${region.name}`,
        })),
      ])
    }
  }, [searchTerm])

  const comps = [{ name: "Up Bank", path: "Profile" }]
  const businessLines = [
    ...companies
      .reduce((acc: any[], curr: any) => [...Array.from(new Set([...acc, curr["L2 (Bank Type)"]]))], [])
      .map((name: any) => ({ name, key: name, path: "List" })),
    { name: "Companies", key: "All", path: "List" },
  ]
  const region1s = companies
    .reduce((acc: any[], curr: any) => [...Array.from(new Set([...acc, curr["ReportRegion1"]]))], [])
    .map((name: any) => ({ name, path: "List" }))

  const handleEnter = (event: any) => {
    // horrible code - will need re-writing
    if (event.key === "Enter") { // redirect
      if (comps.map(b => b.name).includes(searchTerm)) {
        onPressProfile()
      } else {
        businessLines.forEach(b => {
          if (searchTerm.indexOf(b.name) > -1) {
            onPressTaxonomy()
            setTaxonomyView("List")
            businessLines.forEach(b => {
              if (searchTerm.indexOf(b.name) > -1) {
                setFilter({
                  key: "L2 (Bank Type)",
                  type: "choice",
                  name: "Bank Type",
                  value: b.key,
                  display: false,
                })
              }
            })
            region1s.forEach((r: any) => {
              if (searchTerm.indexOf(r.name) > -1) {
                const values = [
                  { key: "emea", name: "EMEA", selected: false },
                  {
                    key: "americas",
                    name: "Americas",
                    selected: false,
                  },
                  { key: "apac", name: "APAC", selected: false },
                ].map(v => (v.name === r.name ? { ...v, selected: true } : v))
                setFilter({
                  key: "ReportRegion1",
                  name: "Region",
                  type: "checkboxes",
                  values,
                  display: true,
                })
              }
            })
          }
        })
      }
    }
  }

  return (
    <header className={classes.header}>
      <Container className={classes.spreader} maxWidth="xl">
        <a href="/" className={classes.logoWrapper}>
          <img src={logo} className={classes.logo} alt="logo" />
        </a>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <Autocomplete
            autoSelect
            className={classes.autocomplete}
            options={options || [...businessLines, ...comps]}
            getOptionLabel={(option: any) => option.name}
            freeSolo
            onKeyDown={e => handleEnter(e)}
            onClose={(event: any, reason: any) => {
              if (reason === "select-option") {
                const path = event.target?.firstChild?.attributes?.path?.value
                setSearchTerm(event.target.innerText)
              }
            }}
            onInputChange={(event, value, reason) => {
              if (reason === "clear") {
                setSearchTerm("")
                setOptions(null)
              }
            }}
            renderInput={params => {
              return (
                <div ref={params.InputProps.ref} className={classes.input}>
                  <InputBase
                    placeholder="Search for business lines or companies..."
                    {...params.inputProps}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                      adornedEnd: classes.endAdornment,
                    }}
                    endAdornment={params.InputProps.endAdornment}
                  />
                </div>
              )
            }}
            renderOption={(option: any, { inputValue }) => {
              const matches = match(option.name, inputValue)
              const parts: any = parse(option.name, matches)
              const path: any = option.path;
              return (
                <div {...{path}}>
                  {parts.map((part: any, index: any) => (
                    <span
                      key={index}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              )
            }}
          />
        </div>
      </Container>
    </header>
  )
}

export default Header