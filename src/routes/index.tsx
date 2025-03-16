// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import PrivateRoute from '../components/layout/PrivateRoute';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard';
import ChequeAuthorization from '../pages/Dashboard/ChequeAuthorization';
import WarehouseInformation from '../pages/Setup/WarehouseInformation';
import BrandInformation from '../pages/Setup/BrandInfo';
import CategoryManagement from '../pages/Setup/ProductCategory';
import BankInformation from '../pages/Setup/BankInformation';
import BranchInformation from '../pages/Setup/BranchInfo';
import UnitInformation from '../pages/Setup/UnitInfo';
import ProductManagement from '../pages/Setup/ProductInformation';
import SupplierManagement from '../pages/Setup/SupplierInformation';
import DesignationInformation from '../pages/Setup/DesignationInfo';
import EmployeeInformation from '../pages/Setup/EmployeeInformation';
import SizeInformation from '../pages/Setup/SizeInformation';
import CommissionManagement from '../pages/Setup/Commission';
import PurchaseInformation from '../pages/purchase/PurchaseInformation';

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
       <Route path="setup/warehouse" element={<WarehouseInformation />} />
      
        <Route path="setup/brand" element={<BrandInformation/>} />
         
        <Route path="setup/product-category" element={<CategoryManagement />} /> 
        <Route path="setup/bank" element={<BankInformation />} /> 
        <Route path="setup/branch" element={<BranchInformation />} /> 
        <Route path="setup/unit" element={<UnitInformation />} />
        <Route path="setup/product" element={<ProductManagement />} />  
        <Route path="setup/supplier" element={<SupplierManagement />} />  
        <Route path="setup/designation" element={<DesignationInformation />} />  
        <Route path="setup/employee" element={<EmployeeInformation />} />  
        <Route path="setup/size" element={<SizeInformation />} />  
        <Route path="setup/commission" element={<CommissionManagement />} />  
         {/* 
        {/* ... other setup routes */}

        {/* Purchase Routes */}
        <Route path="purchase/information" element={<PurchaseInformation/>} />
         {/*
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