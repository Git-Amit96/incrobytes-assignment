import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./utils/AuthProvider.jsx";
import PublicRoute from "./utils/PublicRoute.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import SubCategory from "./pages/SubCategory.jsx";
import Category from "./pages/Category.jsx";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/auth" element={<Auth />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="/" element={<Category />} />
              <Route path="sub-category/:category" element={<SubCategory />} />
              <Route path="products/:subCategory" element={<Products />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;