// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import PrivateRoute from '../components/layout/PrivateRoute';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard';
import ChequeAuthorization from '../pages/Dashboard/ChequeAuthorization';

// Dashboard Routes





const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Layout with nested routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Dashboard Routes */}
        <Route index element={<Dashboard />} />
        <Route path="cheque-authorization" element={<ChequeAuthorization />} />

        {/* Setup Routes */}
        {/* <Route path="setup/warehouse" element={<WarehouseInfo />} />
        <Route path="setup/brand" element={<BrandInfo />} />
        <Route path="setup/product-category" element={<ProductCategory />} /> */}
        {/* ... other setup routes */}

        {/* Purchase Routes */}
        {/* <Route path="purchase/information" element={<PurchaseInfo />} />
        <Route path="purchase/return" element={<PurchaseReturn />} /> */}

        {/* Sales Routes */}
        {/* <Route path="sales" element={<Sales />} />
        <Route path="sales/return" element={<SalesReturn />} />
        <Route path="sales/order" element={<Order />} />
        <Route path="sales/delivery" element={<Delivery />} /> */}

        {/* Add all other routes here */}
        {/* ... */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;