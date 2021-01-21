import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "@material-ui/core"

import { Provider as CompaniesProvider } from "./contexts/CompaniesContext"
import { Provider as TaxonomyProvider } from "./contexts/TaxonomyContext"
import { Provider as FundingProvider } from "./contexts/FundingContext"
import { Provider as CategoryProvider } from "./contexts/CategoryContext"
import { ApolloProvider } from '@apollo/client';
import "./index.css"
import theme from "./theme"
import { createPack } from 'react-component-pack';
import { Routers } from "./Routers/Routers";
import { client } from "./lib/ApolloClient";
import MainTemplate from "./templates/MainTemplate"

const ProviderPack = createPack(
  (props: any) => (<ApolloProvider {...props} client={client}></ApolloProvider>),
  (props: any) => (<ThemeProvider {...props} theme={theme}></ThemeProvider>),
  CompaniesProvider,
  TaxonomyProvider,
  FundingProvider,
  CategoryProvider,
  MainTemplate
);

ReactDOM.render(
  <ProviderPack>
    <Routers />
  </ProviderPack>,
  document.getElementById("root")
)
