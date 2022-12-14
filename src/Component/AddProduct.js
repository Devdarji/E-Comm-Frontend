import { useState } from "react";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const addProduct = async () => {
        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }

        let userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        console.log(result);
    };
    return (
        <div className="register">
            <h1>Add Product</h1>
            <input
                type="text"
                className="inputBox"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter a Product Name"
            />
            {error && !name && <span className="invalid-input">Enter valid name</span>}
            <input
                type="text"
                className="inputBox"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Enter a Product Price"
            />
            {error && !price && <span className="invalid-input">Enter valid price</span>}

            <input
                type="text"
                className="inputBox"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="Enter a Product Category"
            />
            {error && !category && <span className="invalid-input">Enter valid category</span>}

            <input
                type="text"
                className="inputBox"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                placeholder="Enter a Product Company"
            />
            {error && !company && <span className="invalid-input">Enter valid company</span>}

            <button type="button" className="appButton" onClick={addProduct}>
                Add Product
            </button>
        </div>
    );
};

export default AddProduct;
