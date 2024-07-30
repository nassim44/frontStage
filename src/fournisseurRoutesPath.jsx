import { Route, Routes } from "react-router-dom";
import SigninPage from "./views/FrontOffice/components/User/signin/page.jsx";
import SignupPage from "./views/FrontOffice/components/User/signup/page.jsx";
import About from "./views/FrontOffice/HomePage/components/About/AboutSectionOne.jsx";
import Blog from "./views/FrontOffice/HomePage/components/Blog/index.jsx";
import Home from "./views/FrontOffice/HomePage/page.jsx";
import UserOptions from "./views/FrontOffice/components/User/signup/userOptions.jsx";
import DisplayProducts from "./views/FrontOffice/Products/displayProducts.jsx";
import AddProduct from "./views/FrontOffice/Products/Add/addProduct.jsx";
import ProductDetail from "./views/FrontOffice/Products/productDetail/productDetail.jsx";
function FournisseurRoutesPath() {
  return (
    <div>
      <Routes>
        <Route path="/products" element={<DisplayProducts />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Home />} />
        <Route path="/useroption" element={<UserOptions />} />
        <Route path="/productDetail" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default FournisseurRoutesPath;
