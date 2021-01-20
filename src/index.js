import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "@material-ui/core"

import { Provider as CompaniesProvider } from "./contexts/CompaniesContext"
import { Provider as TaxonomyProvider } from "./contexts/TaxonomyContext"
import { Provider as FundingProvider } from "./contexts/FundingContext"
import "./index.css"
import App from "./components/App"
import theme from "./theme"

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CompaniesProvider>
      <TaxonomyProvider>
        <FundingProvider>
          <App />
        </FundingProvider>
      </TaxonomyProvider>
    </CompaniesProvider>
  </ThemeProvider>,
  document.getElementById("root")
)
