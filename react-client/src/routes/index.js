import React, { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'

import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../views/Home'
import Login from '../views/auth/login.jsx'
import Register from '../views/auth/register.jsx'
import Dashboard from '../views/admin/dashboard/index.jsx'

// users page
//import view users index
import UsersIndex from "../views/admin/users/index.jsx";

//import view users create
import UsersCreate from "../views/admin/users/create.jsx";

//import view users edit
import UsersEdit from "../views/admin/users/edit.jsx";

export default function AppRoutes() {
    const { isAuth } = useContext(AuthContext)
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuth ? <Navigate to="/admin/dashboard" replace /> : <Login />} />
            <Route path="/register" element={isAuth ? <Navigate to="/admin/dashboard" replace /> : <Register />} />
            <Route path='/admin/dashboard' element={ isAuth ? <Dashboard/> : <Navigate to="/login" replace/> }></Route>

            {/* route "/admin/users" */}
            <Route path="/admin/users" element={
                isAuth ? <UsersIndex /> : <Navigate to="/login" replace />
            } />

            {/* route "/admin/users/create" */}
            <Route path="/admin/users/create" element={
                isAuth ? <UsersCreate /> : <Navigate to="/login" replace />
            } />

            {/* route "/admin/users/edit/:id" */}
            <Route path="/admin/users/edit/:id" element={
                isAuth ? <UsersEdit /> : <Navigate to="/login" replace />
            } />
        </Routes>
    )
}
