import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { StayIndex } from './pages/StayIndex.jsx'
// import { AdminIndex } from './pages/AdminIndex.jsx'

import { StayDetails } from './pages/StayDetails'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { StayEdit } from './cmps/StayEdit.jsx'
import { UserTrips } from './pages/UserTrips.jsx'
import { UserWishlist } from './pages/UserWishlist.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { OrderCheckout } from './pages/OrderCheckout.jsx'
import { UserOrders } from './pages/UserOrders.jsx'
import { SearchPage } from './pages/SearchPage.jsx'



export function RootCmp() {
    const location = useLocation()
    return (

        <div className={`main-container ${location.pathname.startsWith('/stay') ? 'stay-details-layout' : ''} `}>
            <AppHeader />
            <UserMsg />

            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/s/:params" element={<SearchPage />} />
                    <Route path="stay" element={<StayIndex />} />
                    <Route path="stay/:stayId/checkout" element={<OrderCheckout />} />
                    <Route path="stay/trips" element={<UserTrips />} />
                    <Route path="stay/wishlists" element={<UserWishlist />} />
                    <Route path="stay/orders" element={<UserOrders />} />
                    <Route path="stay/edit" element={<StayEdit />} />
                    <Route path="stay/edit/:stayId" element={<StayDetails />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    {/* <Route path="admin" element={<AdminIndex />} /> */}
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


