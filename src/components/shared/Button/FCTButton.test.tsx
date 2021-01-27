import React from "react";
import FCTButton from "./FCTButton";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../../theme";

const renderComponent = (view: any) =>
  render(
    <ThemeProvider theme={theme}>
      {view}
    </ThemeProvider>
  );

it("Should show button correctly", () => {
  const Button = renderComponent(
    <FCTButton variant="outlined" color="primary">
      Button
    </FCTButton>
  );
  expect(Button).toBeTruthy();
});
