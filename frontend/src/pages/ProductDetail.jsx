import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log("error to fetch data", err);
      }
    };
    getData();
  }, [id]);

const addToCart = async (item) => {
 
  const cartproduct = {
    product_id: item.id,  
    title: item.title,
    price: item.price,
    image: item.image
  };
console.log(cartproduct)
  try {
    await axios.post("http://127.0.0.1:3000/addtocart", cartproduct);
    setFavorites([...favorites, cartproduct]);
    alert(`${item.title} added to cart successfully`)
    navigate('/cart');
   
  } catch (err) {
    alert(" Product is alredy present in cart")
    navigate('/cart');
    console.log("cart error", err);
  }
};



  if (!product) {
    return <div className="text-center mt-5">Loding product detals...</div>;
  }

  return (
    <>
      <div className="container my-5">
        <Link to="/products" className="btn btn-outline-secondary mb-5"> Go Back</Link>

        <div className="row align-items-center">
          <div className="col-md-5 mb-4 text-center">
            <img src={product.image} className="img-fluid border p-3 rounded" alt={product.title} style={{ maxHeight: '400px', objectFit: 'contain' }} />
          </div>
          <div className="col-md-7">
            <h3 className="mb-2">{product.title}</h3>
            <p className="text-muted">{product.category}</p>
            <h4 className="text-success mb-3">${product.price}</h4>
            <p className="">{product.description}</p>
            <p>
              <span className="badge bg-success text-dark">⭐ {product.rating.rate}</span>
              <span className="ms-2 text-muted">({product.rating.count} reviews)</span>
            </p>
            <button onClick={() => addToCart(product)} className="btn btn-info mt-2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ProductDetail;
