import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../../theme";
import FCTSwitch from "./FCTSwitch";

const renderComponent = (view: any) =>
    render(
    <ThemeProvider theme={theme}>
        {view}
    </ThemeProvider>
    );

    it("Should show button correctly", () => {
        const Button = renderComponent(
            <FCTSwitch size="small" color="default">
                Button
            </FCTSwitch>
        );
    expect(Button).toBeTruthy();
    });