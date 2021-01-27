import React, { Fragment, useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import FCTButton from "./FCTButton";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  ThemeProvider,
} from "@material-ui/core";
import theme from "../../../theme";

export default {
  title: "Example/Button",
  component: FCTButton,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["primary", "default"],
      },
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
      table: {
        defaultValue: { summary: "medium" },
      },
    }
  },
} as Meta;

const IconButton = (props: any) => {
  return (
    <Fragment key="icon">
      {props.left && 
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8.41 10l5.29-5.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71l-6 6c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l6 6a1.003 1.003 0 001.42-1.42L8.41 10z" fillRule="evenodd"></path>
        </svg>
      }
      {props.right && 
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.71 9.29l-6-6a1.003 1.003 0 00-1.42 1.42l5.3 5.29-5.29 5.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l6-6c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z" fillRule="evenodd"></path>
        </svg>
      }
    </Fragment>
  );
};

const Template: Story<any> = (args) => {
  const [isLeftIcon, setIsLeftIcon] = useState(false);
  const [isRightIcon, setIsRightIcon] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isLeftIcon}
              onChange={() => setIsLeftIcon(!isLeftIcon)}
            />
          }
          label="Add left icon"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isRightIcon}
              onChange={() => setIsRightIcon(!isRightIcon)}
            />
          }
          label="Add right icon"
        />
      </FormGroup>
      <FCTButton
        {...args}
        variant="outlined"
        startIcon={isLeftIcon ? <IconButton left/> : undefined}
        endIcon={isRightIcon ? <IconButton right/> : undefined}
      >
        Button
      </FCTButton>
    </ThemeProvider>
  );
};

export const Button = Template.bind({});
Button.args = {
  color: "default",
  size: "medium",
  disabled: false,
};
