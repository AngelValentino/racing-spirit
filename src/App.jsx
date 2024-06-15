import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact";
import ProductsCollection from "./pages/ProductsCollection/ProductsCollection";
import ProductDetails from "./pages/ProductsDetails/ProductDetails";
import NotFound from "./pages/NotFound";
import Navbar from "./layouts/Navbar/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ModalProvider } from "./context/ModalContext";
import Footer from "./layouts/Footer/Footer";

const App = () => { 
  return (
      <ShoppingCartProvider>
        <ModalProvider>
          <Navbar />
          <Routes>
            <Route index element={<Home />}/>
            <Route path="jackets" element={<ProductsCollection />}/>
            <Route path="about" element={<About />}/>
            <Route path="contact" element={<Contact />}/>
            <Route path="jackets/:id" element={<ProductDetails />}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
          <Footer />
        </ModalProvider>
      </ShoppingCartProvider>
  );
}
 
export default App;