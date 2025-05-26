import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid d-flex justify-content-evenly align-items-center p-3">

       
        <Link className="navbar-brand fw-bold" to="/" >E-Shop</Link>
        <div className="d-flex gap-5">
          <Link className="nav-link text-white fw-bold" to="/">Home</Link>
          <Link className="nav-link text-white fw-bold" to="/products">Products</Link>
        </div>
        <Link to="/cart" className="nav-link text-white position-relative">
          <FaShoppingCart size={24} />
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
