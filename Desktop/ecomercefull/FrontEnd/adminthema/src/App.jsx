import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Dashboard from './pages/Dashboard';
import CategoryManagement from './pages/CategoryManagement';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';

function App() {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/dashboard">Admin Panel</NavbarBrand>
        <Nav className="mr-auto" navbar>
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
              {/* <DropdownItem tag={Link} to="/category-management/delete">
                Delete Category
              </DropdownItem> */}
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
              {/* <DropdownItem tag={Link} to="/user-management/delete">
                Delete User
              </DropdownItem> */}
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
              {/* <DropdownItem tag={Link} to="/product-management/delete">
                Delete Product
              </DropdownItem> */}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category-management/*" element={<CategoryManagement />} />
        <Route path="/user-management/*" element={<UserManagement />} />
        <Route path="/product-management/*" element={<ProductManagement />} />
      </Routes>
    </div>
  );
}

export default App;
