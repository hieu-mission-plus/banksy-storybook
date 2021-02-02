import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import FCTTab from "./FCTTab";
import FCTTabs from "./FCTTabs";
import { TabProps } from "material-ui";
import FCTIcon from "../Icon/Icon"

export default {
    title: "Example",
    argTypes: {},
} as Meta;

const Template: Story<TabProps> = () => {
    const [value, setValue] = React.useState<number>(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue?: number) => {
        newValue!==undefined && setValue(newValue);
    };
  
    return (
        <FCTTabs
            value={value}
            onChange={handleChange}
        >
            <FCTTab icon={<FCTIcon name='bubble' width='16px' height='16px'/>} label="Bubble view" />
            <FCTTab label="Business" />
            <FCTTab label="Active" disabled/>
            <FCTTab label="Active" />
        </FCTTabs>
    );
};

export const Tabs = Template.bind({});