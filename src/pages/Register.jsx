import React,{useState} from 'react'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";

import styled from "styled-components"
import { registerRoute } from '../utils/APIroute';

function Register() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username : "",
        email : "",
        password : "",
        confirmPassword : "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
          toast.error(
            "Password and confirm password should be same.",
            toastOptions
          );
          return false;
        } else if (username.length < 3) {
          toast.error(
            "Username should be greater than 3 characters.",
            toastOptions
          );
          return false;
        } else if (password.length < 8) {
          toast.error(
            "Password should be equal or greater than 8 characters.",
            toastOptions
          );
          return false;
        } else if (email === "") {
          toast.error("Email is required.", toastOptions);
          return false;
        }
    
        return true;
    };

    const handleChange = (e)=>{
        setValues({...values, [e.target.name] : e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(handleValidation()){
          const {username, email, password} = values;
          const {data} = await axios.post(registerRoute,{
            username,
            email,
            password
          });
          console.log(data);
          if (data.status === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem("chat-app-user",JSON.stringify(data.user));
            navigate("/setProfile");
          }
        }
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className='brand'>
                        <img src="" alt=""/>
                        <h1>SocialConnect</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Create User</button>
                    <span>
                        Already have an account ? <Link to="/login">Login.</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(
    to bottom,
    var(--primary-color) 0%,
    var(--primary-color) 20%,
    var(--light-bg) 20%,
    var(--light-bg) 100%
  );

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: var(--text-primary);
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: white;
    padding: 3rem 5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(255, 107, 107, 0.2);
  }

  input {
    background-color: var(--light-bg);
    padding: 1rem;
    border: 0.1rem solid transparent;
    border-radius: 0.4rem;
    color: var(--text-primary);
    width: 100%;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    
    &:focus {
      border: 0.1rem solid var(--primary-color);
      outline: none;
    }
  }

  button {
    background-color: var(--primary-color);
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: var(--accent-color);
    }
  }

  span {
    color: var(--text-secondary);
    text-transform: uppercase;
    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: var(--accent-color);
      }
    }
  }
`;
export default Register