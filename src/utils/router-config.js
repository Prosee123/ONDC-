import React from "react";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import RenderRoutes from "./routes/render-route";

export default function RouteConfig() {
    const defaultMaterialTheme = createTheme();
    return (
        <ThemeProvider theme={defaultMaterialTheme}>
            <Router >
                <RenderRoutes />                
            </Router>
        </ThemeProvider>
    );
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}


