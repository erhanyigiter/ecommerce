import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Dashboard from './pages/Dashboard';
import CategoryManagement from './pages/CategoryManagement';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import OrderDetails from './components/OrderDetails'; // OrderDetails bileşenini ekleyin


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/dashboard">Admin Panel</NavbarBrand>
        <Nav className="me-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Categories
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={Link} to="/category-management/add">
                Add Category
              </DropdownItem>
              <DropdownItem tag={Link} to="/category-management/update">
                Update Category
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Users
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={Link} to="/user-management/add">
                Add User
              </DropdownItem>
              <DropdownItem tag={Link} to="/user-management/update">
                Update User
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Products
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={Link} to="/product-management/add">
                Add Product
              </DropdownItem>
              <DropdownItem tag={Link} to="/product-management/update">
                Update Product
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Orders
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={Link} to="/order-management">
                Manage Orders
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
      <div className="flex-grow-1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category-management/*" element={<CategoryManagement />} />
          <Route path="/user-management/*" element={<UserManagement />} />
          <Route path="/product-management/*" element={<ProductManagement />} />
          <Route path="/order-management/*" element={<OrderManagement />} />
          <Route path="/order-management/:orderId" element={<OrderDetails />} /> {/* OrderDetails rotasını ekleyin */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
