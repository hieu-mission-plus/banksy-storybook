import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../../theme";
import FCTTabs from "./FCTTabs";
import FCTTab from "./FCTTab";

const renderComponent = (view: any) =>
  render(
    <ThemeProvider theme={theme}>
      {view}
    </ThemeProvider>
  );

it("Should show tabs correctly", () => {
    const Tabs = renderComponent(
        <FCTTabs value={1}>
            <FCTTab label="Active" />
            <FCTTab label="Active" />
            <FCTTab label="Active" disabled/>
            <FCTTab label="Active" />
        </FCTTabs>
    );
  expect(Tabs).toBeTruthy();
});