import React from 'react';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

  const navigate = useNavigate();
  const toProducts = () => {
    navigate('/products');
  };

  return (<>
    <div className="container-fluid text-center mt-5">
        
      <h3 className="display-5 fw-bold w-100 bg-dark text-warning py-3">Welcome to Shopping Products Dashboard</h3>
    
      <button className="btn btn-info mt-5 px-4 py-2 fw-bold" onClick={toProducts}>
        Go to Products Page</button>
    </div>
    </>
  );
};

export default HomePage;
