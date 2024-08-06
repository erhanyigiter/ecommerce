import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
  const location = useLocation();
  const { searchResults = [], searchTerm = '' } = location.state || {};

  return (
    <div className="container mt-5">
      <h2>Search Results for "{searchTerm}"</h2>
      {searchResults.length > 0 ? (
        <div className="row">
          {searchResults.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card">
                <img src={product.image} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Price: ${product.price}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">View Product</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for "{searchTerm}".</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
