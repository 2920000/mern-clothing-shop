import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import { AnnouncemetBar, Header, Navigation } from "./components";
import {
  Account,
  CheckoutPage,
  Collection,
  Home,
  NotFoundPage,
  ProductDetail,
  Profile,
  Purchase,
  User,
} from "./pages";
function App() {
  return (
    <div>
      <Router>
        <AnnouncemetBar />
        <Header />
        <Navigation />
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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
