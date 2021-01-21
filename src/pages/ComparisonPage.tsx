import React from "react"
import useIsMobile from "../hooks/useIsMobile"
import Comparison from "../components/Comparison"

const ComparisonPage = () => {
    const isMobile = useIsMobile()

    return (
        <Comparison isMobile={isMobile} />
    )
}

export default ComparisonPage;