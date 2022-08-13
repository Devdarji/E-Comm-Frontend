import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setProductData();
    }, [])

    const setProductData = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.warn(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {

        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()
        if (result) {
            navigate('/')
        }
    }

    return (
        <div className="register">
            <h1>Update Product</h1>
            <input
                type="text"
                className="inputBox"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter a Product Name"
            />
            <input
                type="text"
                className="inputBox"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Enter a Product Price"
            />

            <input
                type="text"
                className="inputBox"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="Enter a Product Category"
            />

            <input
                type="text"
                className="inputBox"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                placeholder="Enter a Product Company"
            />

            <button type="button" className="appButton" onClick={updateProduct}>
                Update Product
            </button>
        </div>
    );
};

export default UpdateProduct;
