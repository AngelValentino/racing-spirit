import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Products from "./pages/products/Products";
import Product from "./pages/products/Product";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const App = () => { 
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="jackets" element={<Products/>}/>
          <Route path="about" element={<About />}/>
          <Route path="contact" element={<Contact />}/>
          <Route path="jackets/:id" element={<Product />}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}
 
export default App;