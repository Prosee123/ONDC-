import React from 'react';
import { Routes, Route, Navigate, Suspense } from 'react-router-dom';
import Login from '../../views/login/login';
import OndcDashboard from '../../views/ondc-dashboard/ondc-dashboard';
import { getAuthToken } from '../miscellaneous/mics';

function RenderRoutes(props) {

    const checkLogi = () => {
        const authToken = getAuthToken() || null;
        return authToken ? 
        <>
            <Route path="/*" element={<OndcDashboard />} />
            {/* wild route set after login */}
        </>
        :
        <>
            <Route path="/*" element={<Login />} />
            {/* wild route set before login */}
        </>
    }
    

    return (
        <Routes>
            { checkLogi() }
        </Routes>
    )
}


export default RenderRoutes;