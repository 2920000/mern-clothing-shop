import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AnnouncemetBar, DesktopNav, Footer, Header } from "./components";
import { userSelector } from "./features/accountSlice";
import {
  Account,
  Collection,
  Home,
  NotFoundPage,
  ProductDetail,
  Profile,
  Purchased,
  User,
} from "./pages";
import Login from "./pages/Account/Login/Login";
import Register from "./pages/Account/Register/Register";
import Checkout from "./pages/Checkout";
function App() {
  const user = useSelector(userSelector);
  return (
    <div>
      <Router>
        <AnnouncemetBar />
        <Header />
        <DesktopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:collection" element={<Collection />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/account" element={<Account />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route
            path="/checkout"
            element={user ? <Checkout /> : <Navigate to="/account/login" />}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/user"
            element={user ? <User /> : <Navigate to="/account/login" />}
          >
            <Route path="profile" element={<Profile />} />
            <Route path="purchase" element={<Purchased />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
