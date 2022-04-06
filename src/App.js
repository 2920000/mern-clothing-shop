import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Navigation from "./components/navigation/Navigation";
import AnnouncemetBar from "./components/announcement-bar/AnnouncemetBar";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/product-detail/ProductDetail";
import Account from "./pages/account/Account";
import NotFoundPage from "./pages/NotFoundPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import User from "./pages/user/User";
import Profile from "./pages/user/Profile";
import Purchase from "./pages/user/Purchase";
function App() {
  const path = window.location.pathname;

  return (
    <div>
      <Router>
        <AnnouncemetBar />
        <Header />
        {path !== "/checkout" && <Navigation />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:collection" element={<Collection />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/account/:option" element={<Account />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/user" element={<User />}>
            <Route path="profile" element={<Profile />} />
            <Route path="purchase" element={<Purchase />} />
          </Route>
        </Routes>
        {path !== "/checkout" && <Footer />}
      </Router>
    </div>
  );
}

export default App;
