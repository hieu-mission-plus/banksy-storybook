import React from "react";
import { Tab, TabProps, withStyles } from "@material-ui/core";
import themeMain from "../../../theme";

const FCTTab = withStyles((theme) => ({
    root: {
        color: '#6C809D',
        height: 32,
        opacity: 1,
        borderRadius: 2,
        margin: 3,
        minWidth: 88,
        minHeight: 0,
        fontSize: '12px!important',
        textTransform: 'none',
    },
    selected: {
        color: theme.palette.common.white,
        background: themeMain.palette.primary.main,
    },
    wrapper: {
        flexDirection: 'row',
        '& .MuiSvgIcon-root': {
            marginRight: 5,
            marginBottom: '0!important',
            fontSize: 15,
        },
    },
    labelIcon: {
        paddingTop: 6,
        '& .MuiTab-wrapper > *:first-child': {
            marginBottom: 0,
            marginRight: 8,
        },
    },
}))((props: TabProps) => (
    <Tab {...props}></Tab>
));

export default FCTTab;
