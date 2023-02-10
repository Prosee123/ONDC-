import React from 'react';
import { Routes, Route, Navigate, Suspense } from 'react-router-dom';
import Login from '../../views/login/login';
import OndcDashboard from '../../views/ondc-dashboard/ondc-dashboard';

function RenderRoutes(props) {   

    return (
        <Routes>
            <Route path="/" element={<OndcDashboard />} />
            <Route path="/dashboard" element={<OndcDashboard />} />
            <Route path="/login" element={<Login />} />            
        </Routes>
    )
}


export default RenderRoutes;