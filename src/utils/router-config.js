import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Login from "../views/login/login";
import OndcDashboard from "../views/ondc-dashboard/ondc-dashboard";
import history from "./history";

const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/ondc-dashboard",
        component: OndcDashboard
    },
    //   {
    //     path: "/tacos",
    //     component: Tacos,
    //     routes: [
    //       {
    //         path: "/tacos/bus",
    //         component: Bus
    //       },
    //       {
    //         path: "/tacos/cart",
    //         component: Cart
    //       }
    //     ]
    //   }
];

export default function RouteConfig() {
    return (
        <Router >
            <Routes>
                <Route path="/dashboard" element={<OndcDashboard/>}/>
                <Route exact path="/" element={<Login/>}/>
            </Routes>
        </Router>
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


