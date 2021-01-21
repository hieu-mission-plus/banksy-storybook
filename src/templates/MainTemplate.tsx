import { Container, makeStyles } from "@material-ui/core";
import Header from "../components/Header";
import React, { useContext, useEffect } from "react";
import { Context as FundingContext } from "../contexts/FundingContext"
import { Context as CompaniesContext } from "../contexts/CompaniesContext"
import { csv, groups, group } from "d3"
import { funding, comparison, headers, map_logos, companies } from "../data/index"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
    },
    content: {
        flex: 1,
        display: "flex",
    },
})
const MainTemplate = (props: any) => {
    const classes = useStyles()
    const { children } = props;
    // Load data
    // TODO: let remove at the future
    const { setFundingData } = useContext(FundingContext)
    const { setCompaniesData, setAdaptabilities, setCapabilities, setLogos } = useContext(
        CompaniesContext
    )
    useEffect(() => {
        const datasets = [
            csv(funding),
            csv(companies),
            csv(comparison),
            csv(headers),
            csv(map_logos)
        ]
        Promise.all(datasets).then(
            ([funding, companies, comparison, headers, map_logos]) => {
                const labeledHeaders = headers
                    .map(h =>
                        h.category === "Products" || h.category === "Features"
                            ? { ...h, type: "adapt" }
                            : h.category === "Scale"
                                ? { ...h, type: "score" }
                                : h
                    )
                    .filter(d => d.type)
                const [caps, adapts] = groups(labeledHeaders, h => h.type)
                setLogos(group(map_logos, l => l.category))
                setFundingData(funding)
                setCompaniesData(companies, comparison)
                setAdaptabilities(adapts[1].map(a => ({ ...a, selected: true })))
                setCapabilities(caps[1].map(c => ({ ...c, selected: true })))
            }
        )
    }, [])
    // Finish load data
    return (
        <div {...props} className={classes.root}>
            <Header setTaxonomyView={null} />
            <Container className={classes.content} maxWidth="xl">
                {children}
            </Container>
        </div>
    )
}
export default MainTemplate;