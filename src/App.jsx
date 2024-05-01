import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductsPreview from "./pages/products/ProductsPreview";
import ProductDetails from "./pages/products/ProductDetails";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const App = () => { 
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="jackets" element={<ProductsPreview/>}/>
          <Route path="about" element={<About />}/>
          <Route path="contact" element={<Contact />}/>
          <Route path="jackets/:id" element={<ProductDetails />}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}
 
export default App;