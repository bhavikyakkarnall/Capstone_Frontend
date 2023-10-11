// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'
import Dispatches from '../components/Dispatches';
import Home from '../components/Home';
import Login from '../components/Login';
import Orders from '../components/Orders';
import Products from '../components/Products';
import InventoryItems from '../components/InventoryItems';
import ProtectedRoute from './ProtectRoute';
import LogoutPage from '../components/Logout';
import PageNotFound from '../components/PageNotFound';

export default function AppRoutes(props) {

    return (
        <Routes>
            <Route path='login/*' element={<Login></Login>} />

            <Route index element={
                <ProtectedRoute>
                    <Products {...props} />
                </ProtectedRoute>
            } />

            <Route path='/orders' element={
                <ProtectedRoute>
                    <Orders {...props} />
                </ProtectedRoute>
            } />

            <Route path='/inventory-items' element={
                <ProtectedRoute>
                    <InventoryItems {...props} />
                </ProtectedRoute>
            } />

            <Route path='/dispatches' element={
                <ProtectedRoute>
                    <Dispatches {...props} />
                </ProtectedRoute>
            } />

            <Route path="/logout" element={
                <ProtectedRoute>
                    <LogoutPage />
                </ProtectedRoute>
            } />

            <Route path="*" element={<PageNotFound />} />


        </Routes>
    )

}