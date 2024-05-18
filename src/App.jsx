import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductsPreviewList from "./pages/products/ProductsPreviewList";
import ProductDetails from "./pages/products/ProductDetails";
import NotFound from "./pages/NotFound";
import Navbar from "./layouts/Navbar/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ModalProvider } from "./context/ModalContext";
import Footer from "./layouts/Footer";

const App = () => { 
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <ModalProvider>
          <Navbar />
          <main>
            <Routes>
              <Route index element={<Home />}/>
              <Route path="jackets" element={<ProductsPreviewList/>}/>
              <Route path="about" element={<About />}/>
              <Route path="contact" element={<Contact />}/>
              <Route path="jackets/:id" element={<ProductDetails />}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </main>
          <Footer />
        </ModalProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}
 
export default App;