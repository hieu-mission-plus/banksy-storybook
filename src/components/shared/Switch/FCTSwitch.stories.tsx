import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import FCTSwitch from "./FCTSwitch";
import { ThemeProvider, SwitchProps } from "@material-ui/core";
import theme from "../../../theme";

export default {
    title: "Example",
    component: FCTSwitch,
    argTypes: {
      color: {
        control: {
          type: "select",
          options: ["secondary", "primary", "default"],
        },
        table: {
          defaultValue: { summary: "default" },
        },
      },
      size: {
        control: {
          type: "select",
          options: ["small", "medium"],
        },
        table: {
          defaultValue: { summary: "medium" },
        },
      }
    },
} as Meta;

const Template: Story<SwitchProps> = (args) => {
    return (
      <ThemeProvider theme={theme}>
        <FCTSwitch {...args}></FCTSwitch>
      </ThemeProvider>
    );
};

export const Switch = Template.bind({});
Switch.args = {
  color: "primary",
  size: "medium",
  disabled: false,
};