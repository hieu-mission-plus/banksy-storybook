import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const ComparisonPage = lazy(() => import('../pages/ComparisonPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage'));

export const Routers = () => {
    const renderApp = () => (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>
            <Switch>
                <Route exact path="/comparison" component={ComparisonPage} />
            </Switch>
            <Switch>
                <Route exact path="/profile" component={ProfilePage} />
            </Switch>
            <Switch>
                <Route exact path="/analytics" component={AnalyticsPage} />
            </Switch>
        </Suspense>
    )
    return (
        <BrowserRouter>
            { renderApp()}
        </BrowserRouter>
    )
}