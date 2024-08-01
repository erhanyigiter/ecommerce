import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { Container, Row, Col, Card, CardBody, Button, Form, FormGroup, Input, Label } from 'reactstrap';

const ShopDetails = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handlePriceFilter = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleColorFilter = (event) => {
    const value = event.target.value;
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.includes(value)
        ? prevSelectedColors.filter((color) => color !== value)
        : [...prevSelectedColors, value]
    );
  };

  const handleSizeFilter = (event) => {
    const value = event.target.value;
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(value)
        ? prevSelectedSizes.filter((size) => size !== value)
        : [...prevSelectedSizes, value]
    );
  };

  // Tanımlanan renk ve bedenler
  const colors = ['black', 'white', 'red', 'blue', 'green']; // Renk filtreleri
  const sizes = ['xs', 's', 'm', 'l', 'xl']; // Beden filtreleri

  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      selectedPriceRange === 'all' ||
      (selectedPriceRange === '0-1000' && product.price >= 0 && product.price <= 1000) ||
      (selectedPriceRange === '1000-2000' && product.price > 1000 && product.price <= 2000) ||
      (selectedPriceRange === '2000-3000' && product.price > 2000 && product.price <= 3000) ||
      (selectedPriceRange === '3000-5000' && product.price > 3000 && product.price <= 5000) ||
      (selectedPriceRange === '5000-10000' && product.price > 5000 && product.price <= 10000);

    // Description'dan renk ve beden bilgilerini çıkar
    const description = product.description ? product.description.toLowerCase() : '';

    // Seçilen filtrelerle eşleşen ürünleri bul
    const matchesColor =
      selectedColors.length === 0 ||
      selectedColors.every((color) => description.includes(color.toLowerCase()));
    const matchesSize =
      selectedSizes.length === 0 ||
      selectedSizes.every((size) => description.includes(size.toLowerCase()));

    return matchesPrice && matchesColor && matchesSize;
  });

  return (
    <Container className="py-5">
      <Row>
        <Col lg="3" md="4">
          <Card className="mb-4">
            <CardBody>
              <h5 className="section-title text-uppercase mb-3">
                <span className="bg-secondary pr-3">Filter by price</span>
              </h5>
              <Form>
                <FormGroup check className="mb-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="price"
                      value="all"
                      checked={selectedPriceRange === 'all'}
                      onChange={handlePriceFilter}
                    />{' '}
                    All Price
                  </Label>
                </FormGroup>
                <FormGroup check className="mb-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="price"
                      value="0-1000"
                      checked={selectedPriceRange === '0-1000'}
                      onChange={handlePriceFilter}
                    />{' '}
                    $0 - $1000
                  </Label>
                </FormGroup>
                <FormGroup check className="mb-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="price"
                      value="1000-2000"
                      checked={selectedPriceRange === '1000-2000'}
                      onChange={handlePriceFilter}
                    />{' '}
                    $1000 - $2000
                  </Label>
                </FormGroup>
                <FormGroup check className="mb-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="price"
                      value="2000-3000"
                      checked={selectedPriceRange === '2000-3000'}
                      onChange={handlePriceFilter}
                    />{' '}
                    $2000 - $3000
                  </Label>
                </FormGroup>
                <FormGroup check className="mb-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="price"
                      value="3000-5000"
                      checked={selectedPriceRange === '3000-5000'}
                      onChange={handlePriceFilter}
                    />{' '}
                    $3000 - $5000
                  </Label>
                </FormGroup>
                <FormGroup check className="mb-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="price"
                      value="5000-10000"
                      checked={selectedPriceRange === '5000-10000'}
                      onChange={handlePriceFilter}
                    />{' '}
                    $5000 - $10000
                  </Label>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <h5 className="section-title text-uppercase mb-3">
                <span className="bg-secondary pr-3">Filter by color</span>
              </h5>
              <Form>
                <FormGroup check className="mb-3">
                  <Label check>
                    <Input
                      type="checkbox"
                      name="color"
                      value="all"
                      checked={selectedColors.length === 0}
                      onChange={() => setSelectedColors([])}
                    />{' '}
                    All Colors
                  </Label>
                </FormGroup>
                {colors.map((color) => (
                  <FormGroup check className="mb-3" key={color}>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="color"
                        value={color}
                        checked={selectedColors.includes(color)}
                        onChange={handleColorFilter}
                      />{' '}
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </Label>
                  </FormGroup>
                ))}
              </Form>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <h5 className="section-title text-uppercase mb-3">
                <span className="bg-secondary pr-3">Filter by size</span>
              </h5>
              <Form>
                <FormGroup check className="mb-3">
                  <Label check>
                    <Input
                      type="checkbox"
                      name="size"
                      value="all"
                      checked={selectedSizes.length === 0}
                      onChange={() => setSelectedSizes([])}
                    />{' '}
                    All Sizes
                  </Label>
                </FormGroup>
                {sizes.map((size) => (
                  <FormGroup check className="mb-3" key={size}>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="size"
                        value={size}
                        checked={selectedSizes.includes(size)}
                        onChange={handleSizeFilter}
                      />{' '}
                      {size.toUpperCase()}
                    </Label>
                  </FormGroup>
                ))}
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col lg="9" md="8">
          <Row>
            {status === 'loading' ? (
              <div>Loading...</div>
            ) : status === 'failed' ? (
              <div>{error}</div>
            ) : (
              filteredProducts.map((product) => (
                <Col key={product.id} lg="4" md="6" sm="6" className="mb-4">
                  <Card className="product-item bg-light">
                    <div className="product-img position-relative overflow-hidden">
                      <img
                        className="img-fluid w-100"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                      <div className="product-action">
                        <Button color="outline-dark" className="btn-square">
                          <i className="fa fa-shopping-cart"></i>
                        </Button>
                        <Button color="outline-dark" className="btn-square">
                          <i className="far fa-heart"></i>
                        </Button>
                        <Button color="outline-dark" className="btn-square">
                          <i className="fa fa-sync-alt"></i>
                        </Button>
                        <Button color="outline-dark" className="btn-square">
                          <i className="fa fa-search"></i>
                        </Button>
                      </div>
                    </div>
                    <CardBody className="text-center">
                      <h6 className="text-truncate">{product.name}</h6>
                      <div className="d-flex align-items-center justify-content-center mt-2">
                        <h5>${product.price}</h5>
                        {product.originalPrice && (
                          <h6 className="text-muted ml-2">
                            <del>${product.originalPrice}</del>
                          </h6>
                        )}
                      </div>
                      <div className="d-flex align-items-center justify-content-center mb-1">
                        {Array(product.rating)
                          .fill()
                          .map((_, i) => (
                            <small key={i} className="fa fa-star text-primary mr-1"></small>
                          ))}
                        {product.rating < 5 &&
                          Array(5 - product.rating)
                            .fill()
                            .map((_, i) => (
                              <small key={i} className="far fa-star text-primary mr-1"></small>
                            ))}
                        <small>({product.numReviews})</small>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          <Row className="mt-4">
            <Col>
              <nav>
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <Button className="page-link">Previous</Button>
                  </li>
                  <li className="page-item active">
                    <Button className="page-link">1</Button>
                  </li>
                  <li className="page-item">
                    <Button className="page-link">2</Button>
                  </li>
                  <li className="page-item">
                    <Button className="page-link">3</Button>
                  </li>
                  <li className="page-item">
                    <Button className="page-link">Next</Button>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ShopDetails;
