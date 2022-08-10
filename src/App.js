import "./App.css";
import Navbar from "./Component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Component/Footer";
import SignUp from "./Component/SignUp";
import Private from "./Component/Private";
import Login from "./Component/Login";
import AddProduct from "./Component/AddProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route element={<Private />}>
            <Route path="/" element={<h1>Product Component</h1>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update" element={<h1>Update Product Component</h1>} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
