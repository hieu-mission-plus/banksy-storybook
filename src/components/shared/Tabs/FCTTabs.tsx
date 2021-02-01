import { Tabs, TabsProps, withStyles } from "@material-ui/core";

const FCTTabs = withStyles((theme) => ({
    root: {
        border: '1px solid #E7ECF3',
        borderRadius: 3,
        minHeight: 0,
        display: 'inline-flex',
    },
    indicator: {
        height: 0,
    }
}))((props: TabsProps) => (
    <Tabs {...props}
    ></Tabs>
));

export default FCTTabs;
