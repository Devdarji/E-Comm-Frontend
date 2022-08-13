import { useState, useEffect } from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };
  console.log(products);

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();

      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div>
      <h2 className="text-center m-3">Product List</h2>

      <Container>
        <Form.Control type="text" placeholder="Search Products" size="lg" onChange={searchHandle} />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                  <td>
                    <Button size="sm" variant="danger" onClick={() => deleteProduct(item._id)}>
                      Delete Product
                    </Button>
                    &nbsp;
                    <Link to={"/update/" + item._id}>
                      <Button size="sm" variant="success">
                        Update Product
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-3 text-danger" size="lg">
                  <h3>No Product Found </h3>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ProductList;
