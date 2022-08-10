import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        let auth = localStorage.getItem("user")
        if (auth) {
            navigate('/')
        }
    }, [navigate])

    const getData = async () => {
        console.log(name, email, password);
        let result = await fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        localStorage.setItem("user", JSON.stringify(result));
        console.log(result);
        navigate('/')
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="Enter a Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="appButton" type="button" onClick={getData}>
                Sign Up
            </button>
        </div>
    );
}

export default SignUp;
