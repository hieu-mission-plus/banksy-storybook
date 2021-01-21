import React from "react"
import useIsMobile from "../hooks/useIsMobile"
import Analytics from "../components/Analytics"

const AnalyticsPage = () => {
    const isMobile = useIsMobile()

    return (
        <Analytics isMobile={isMobile} />
    )
}

export default AnalyticsPage;