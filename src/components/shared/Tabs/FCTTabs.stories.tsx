import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import FCTTab from "./FCTTab";
import FCTTabs from "./FCTTabs";
import PhoneIcon from '@material-ui/icons/Phone';
import { TabProps } from "material-ui";

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
            <FCTTab icon={<PhoneIcon />} label="Active" />
            <FCTTab label="Active" />
            <FCTTab label="Active" disabled/>
            <FCTTab label="Active" />
        </FCTTabs>
    );
};

export const Tabs = Template.bind({});