import createDataContext from "./createDataContext"
import logos from "../data/logos"
import dummy from "../images/logos/dummy.png"

const initFilters = [
  {
    key: "Latest Round",
    name: "Maturity",
    type: "checkboxes",
    values: [
      { key: "Series D", name: "Series D", selected: false },
      { key: "Undisclosed", name: "Undisclosed", selected: false },
      { key: "Series E+", name: "Series E+", selected: false },
      { key: "Series A", name: "Series A", selected: false },
      { key: "Private Equity", name: "Private Equity", selected: false },
      { key: "Series C", name: "Series C", selected: false },
      { key: "M&A", name: "M&A", selected: false },
      { key: "Seed/Angel", name: "Seed/Angel", selected: false },
      { key: "Post IPO Equity", name: "Post IPO Equity", selected: false },
      { key: "Debt", name: "Debt", selected: false },
      { key: "Series B", name: "Series B", selected: false },
      {
        key: "Corporate Minority",
        name: "Corporate Minority",
        selected: false,
      },
      { key: "IPO", name: "IPO", selected: false },
      { key: "Growth Equity", name: "Growth Equity", selected: false },
    ],
    display: true,
  },
  {
    key: "ReportRegion1",
    name: "Region",
    type: "checkboxes",
    values: [
      { key: "emea", name: "EMEA", selected: false },
      { key: "americas", name: "Americas", selected: false },
      { key: "apac", name: "APAC", selected: false },
    ],
    display: true,
  },
  {
    key: "Status",
    name: "Operating Status",
    type: "checkboxes",
    values: [
      { key: "Acquired", name: "Acquired", selected: false },
      {
        key: "Operating subsidiary",
        name: "Operating subsidiary",
        selected: false,
      },
      { key: "Operating", name: "Operating", selected: false },
    ],
    display: true,
  },
  {
    key: "L2 (Bank Type)",
    type: "choice",
    name: "Bank Type",
    value: "All",
    display: false,
  },
]

const multipleChoiceFilter = (filter: any) => (company: any) => {
  const selectedFilters = filter.values.filter((v: any) => v.selected).map((v: any) => v.name)
  return (
    !selectedFilters.length || selectedFilters.includes(company[filter.key])
  )
}

const radioFilter = (filter: any) => (company: any) =>
  filter.value === "All" || company[filter.key] === filter.value

const filterFns: any = {
  ReportRegion1: multipleChoiceFilter,
  "Latest Round": multipleChoiceFilter,
  "L2 (Bank Type)": radioFilter,
  Status: multipleChoiceFilter,
}

const initColumns = [
  { key: "SourceURL", selected: false, name: "Website" },
  { key: "Founded_Year", selected: true, name: "Year founded" },
  { key: "Status", selected: false, name: "Operating status" },
  { key: "ReportRegion1", selected: true, name: "Region" },
  { key: "ReportRegion2", selected: false, name: "Region 2" },
  { key: "ReportRegion3", selected: false, name: "Region 3" },
  { key: "ReportCountry", selected: true, name: "Country" },
  { key: "ReportCity", selected: true, name: "City" },
  { key: "L2 (Bank Type)", selected: false, name: "Bank Model" },
  { key: "L3 (Bank Model)", selected: false, name: "Bank Type" },
  { key: "Sector", selected: false, name: "Sector" },
  { key: "Latest Round", selected: true, name: "Funding stage" },
]

const initialState = {
  loading: false,
  companies: [],
  selectedIndices: [],
  filters: initFilters,
  filteredCompanies: [],
  capabilities: [],
  adaptabilities: [],
  columns: initColumns,
  logos: [],
}

const companiesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_COMPANIES":
      const companies = action.payload
      return {
        ...state,
        companies,
        filteredCompanies: companies,
      }
    case "SET_SELECTED_COMPANIES":
      return { ...state, selectedIndices: action.payload }
    case "SET_FILTER":
      // update filters list with new filter
      const filters = state.filters.map((f: any) =>
        f.key === action.payload.key ? action.payload : f
      )
      // run filters on list of companies
      const filteredCompanies = filters.reduce(
        (acc: any, curr: any) => acc.filter(filterFns[curr.key](curr)),
        state.companies
      )
      return { ...state, filters, filteredCompanies }
    case "RESET_FILTERS":
      // filters which shouldn't update
      const nonDisplayFilters = state.filters.filter((f: any) => !f.display)
      // run these filters on new companies
      const nonDisplayFilteredCompanies = nonDisplayFilters.reduce(
        (acc: any, curr: any) => acc.filter(filterFns[curr.key](curr)),
        state.companies
      )
      return {
        ...state,
        filters: [...nonDisplayFilters, ...initFilters.filter(f => f.display)],
        filteredCompanies: nonDisplayFilteredCompanies,
      }
    case "SET_CAPABILITIES":
      return { ...state, capabilities: action.payload }
    case "SET_ADAPTABILITIES":
      return { ...state, adaptabilities: action.payload }
    case "SET_COLUMNS":
      return { ...state, columns: action.payload }
    case "SET_LOGOS":
      return { ...state, logos: action.payload }
    default:
      return state
  }
}

const setCompaniesData = (dispatch: any) => (companies: any, comparison: any) => {
  const data = companies
    .map((company: any) => ({
      ...company,
      ...comparison.find((comp: any) => comp["Company"] === company["Company"]),
      logo: logos.find(logo => logo.company === company.Company)?.logo || dummy,
    }))
    .sort((a: any, b: any) => {
      return (
        (Number(b["Current Account"]) || -1) -
        (Number(a["Current Account"]) || -1)
      )
    })
    .map((d: any, i: any) => ({ ...d, i }))
  dispatch({ type: "SET_COMPANIES", payload: data })
  dispatch({ type: "SET_FILTERED_COMPANIES", payload: data })
  dispatch({
    type: "SET_SELECTED_COMPANIES",
    payload: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  })
}

const setSelectedCompanies = (dispatch: any) => (companies: any) => {
  const allowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  const indices = Object.keys(companies)
  const filteredIndices = indices.filter(comp =>
    allowed.find(id => id === comp)
  )
  dispatch({ type: "SET_SELECTED_COMPANIES", payload: filteredIndices })
}

const setFilter = (dispatch: any) => (filter: any) => {
  dispatch({ type: "SET_FILTER", payload: filter })
}

const resetFilters = (dispatch: any) => () => {
  dispatch({ type: "RESET_FILTERS" })
}

const setCapabilities = (dispatch: any) => (capabilities: any) => {
  dispatch({ type: "SET_CAPABILITIES", payload: capabilities })
}

const setAdaptabilities = (dispatch: any) => (adaptabilities: any) => {
  dispatch({ type: "SET_ADAPTABILITIES", payload: adaptabilities })
}

const setColumns = (dispatch: any) => (columns: any) => {
  dispatch({ type: "SET_COLUMNS", payload: columns })
}

const setLogos = (dispatch: any) => (logos: any) => {
  dispatch({ type: "SET_LOGOS", payload: logos })
}

export const { Provider, Context } = createDataContext(
  companiesReducer,
  {
    setSelectedCompanies,
    setCompaniesData,
    setFilter,
    resetFilters,
    setCapabilities,
    setAdaptabilities,
    setColumns,
    setLogos,
  },
  initialState
)
