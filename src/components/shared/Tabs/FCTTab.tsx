import React from "react";
import { Tab, TabProps, withStyles } from "@material-ui/core";
import themeMain from "../../../theme";

const FCTTab = withStyles((theme) => ({
    root: {
        color: '#6C809D',
        width: 88,
        height: 32,
        opacity: 1,
        borderRadius: 4,
        margin: 5,
        'min-width': 0,
        'min-height': 0,
        fontSize: '12px!important',
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
}))((props: TabProps) => (
    <Tab {...props}></Tab>
));

export default FCTTab;
