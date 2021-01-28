import { Switch, SwitchClassKey, SwitchProps, withStyles } from "@material-ui/core";
import React from "react";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
}

interface Props extends SwitchProps {
    classes: Styles;
}

const FCTSwitch = withStyles((theme) => ({
    root: {
        width: 53,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        top: 3,
        left: 3,
        padding: '0!important',
        color: '#9AA0B3',
        '&$checked': {
            transform: 'translateX(27px)',
            '& + $track': {
                backgroundColor: '#F2F3F7',
                opacity: 1,
                border: 'none',
                padding: 0,
            },
        },
    },

    thumb: {
        width: 20,
        height: 20,
        boxShadow: 'none',
    },
    track: {
        borderRadius: 13,
        backgroundColor: '#F2F3F7',
        opacity: 1,
    },
    sizeSmall: {
        width: 39,
        height: 22,
    },
    checked: {},
}))((props : Props) => (
    <Switch
        {...props}
        disableRipple
    />
));

export default FCTSwitch;