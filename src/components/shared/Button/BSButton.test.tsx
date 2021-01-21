import React from "react";
import BSButton from "./BSButton";
import { render, waitFor } from "@testing-library/react";
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
    <BSButton variant="outlined" color="primary">
      Button
    </BSButton>
  );
  expect(Button).toBeTruthy();
});

it("Should show primary button correctly", async () => {
  const { getByTestId } = renderComponent(
    <BSButton variant="outlined" color="primary">
      Button
    </BSButton>
  );
  const element = await waitFor(() => getByTestId("button-primary"));
  expect(element.textContent).toEqual("Button");
  expect(element).toBeTruthy();
}, 10000);
