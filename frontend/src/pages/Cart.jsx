import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3000/cartproducts");
      setData(result.data.cartItems);
      setTotal(result.data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      alert("Failed to load cart items");
    }
  };

  const removeFromCart = async (id) => {
    try {
      if (window.confirm("Remove this item from cart?")) {
        await axios.delete(`http://localhost:3000/deleteproduct/${id}`);
        setData((prev) => prev.filter((item) => item.product_id !== id));
        alert("Removed successfully");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <div className="bg-dark">
        <h2 className="text-center text-warning p-4 fw-bold mb-4">
          Products in Cart
        </h2>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {data.length > 0 ? (
          data.map((product) => (
            <div className="card shadow-sm" style={{ width: "18rem" }} key={product.product_id}>
              <img src={product.image} className="card-img-top p-4" alt={product.title}
                style={{ height: "250px", objectFit: "contain" }}/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text fw-bold">${product.price}</p>
                <button
                  onClick={() => removeFromCart(product.product_id)}
                  className="btn btn-danger mt-auto">
                  Remove</button>
              </div>
            </div>
          ))) : (
          <p className="text-center fs-5">No products in cart</p>
        )}
      </div>

      <div className="row mt-5">
        <div className="card p-4 shadow-sm w-50 m-auto">
          <h3 className="text-center">Total Price</h3>
          <h1 className="text-center text-success">
            ${typeof total === "number" ? total.toFixed(2) : "0.00"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Cart;
