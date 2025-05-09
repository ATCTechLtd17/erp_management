/* eslint-disable @typescript-eslint/no-unused-vars */
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
import PurchaseReturnInformation from '../pages/purchase/PurchaseReturnInfo';
import SalesInformation from '../pages/Sales/SalesInfromation';
import SalesReturnInformation from '../pages/Sales/SalesReturnInfor';
import OnlineOrders from '../pages/Sales/Order';
import AdjustmentInformation from '../pages/adjustment/AdjustmentInformation';
import AccountGroupForm from '../pages/accounting/AccountGroup';
import AccountHeadForm from '../pages/accounting/AccountHead';
import GeneralLedgerForm from '../pages/accounting/GeneralLedger';
import UserManagement from '../pages/security/UserManagement';
import UserPermission from '../pages/security/UserPermissions';
import InvoiceRemoval from '../pages/security/RemoveInvoice';
import ProductManufactureMaterials from '../pages/production/ProductRecipe';
import ProductionAndConsumption from '../pages/production/Production';
import ManualConsumption from '../pages/production/ManualConsumption';
import MessageSend from '../pages/customer/Message';
import CustomerInformation from '../pages/customer/CustomerInformation';
import WarehouseSendProduct from '../pages/warehouse/WarehouseSendProduct';
import WarehouseReceiveProduct from '../pages/warehouse/WarehouseRecieveProduct';

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
      
        <Route path="purchase/return" element={<PurchaseReturnInformation />} /> 

        {/* Sales Routes */}
 <Route path="sales" element={<SalesInformation />} />
      <Route path="sales/return" element={<SalesReturnInformation />} />
      
        <Route path="sales/order" element={<OnlineOrders />} />
        <Route path="adjustment" element={<AdjustmentInformation />} />
           {/*
        <Route path="sales/delivery" element={<Delivery />} />  */}

        {/* Add all other routes here */}

        <Route path="accounting/group" element={<AccountGroupForm />} />
        <Route path="accounting/head" element={<AccountHeadForm />} />
        <Route path="accounting/payment" element={<AccountHeadForm />} />
        <Route path="accounting/ledger" element={<GeneralLedgerForm />} />
        {/* ... */}

        <Route path="security/create-user" element={<UserManagement />} />
        <Route path="security/permissions" element={<UserPermission onSave={function (userId: string, email: string, permissions: MenuPermission[]): void {
          throw new Error('Function not implemented.');
        } } onCancel={function (): void {
          throw new Error('Function not implemented.');
        } } />} />

<Route path="security/remove-invoice" element={<InvoiceRemoval onRemove={function (invoiceNo: string): Promise<void> {
          throw new Error('Function not implemented.');
        } } onCancel={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
<Route path="accounting/ledger" element={<GeneralLedgerForm />} />


<Route path="production/recipe" element={<ProductManufactureMaterials />} />
<Route path="production/manage" element={<ProductionAndConsumption />} />
<Route path="production/consumption" element={<ManualConsumption />} />


<Route path="customer/message" element={<MessageSend />} />
<Route path="customer/information" element={<CustomerInformation />} />

<Route path="warehouse/send" element={<WarehouseSendProduct />} />
<Route path="warehouse/receive" element={<WarehouseReceiveProduct />} />


      </Route> 
    </Routes>
  );
};

export default AppRoutes;