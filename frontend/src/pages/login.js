import React, { useState } from "react";
// import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  { redirect, Redirect } from 'react-router-dom'


export default function Login (){
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [curred, setcurred] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    
    const handleSubmit = async (e) => {
        alert("submitted");
        // console.log(formData)

        let regex = 
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
      e.preventDefault();
      try {
        if(!regex.test(formData.password)){
            setErrorOccurred(true);
            alert("Passwords must include One uppercase alphabet, One lowercase alphabet, One numerical, One special character");
        }
        else{
        const response = await axios.post('http://localhost:5000/api/login/login', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        alert(response.data.msg);
        <redirect to="/user"/>
        setcurred(true)
    }
      } catch (error) {
        setErrorOccurred(true)
      }
    };
    return (
        <div className="container">
          <div className="row justify-content-center m-5">
            <div className="col-md-6 alireza p-4 ">
            {curred }
              <form className="m-2" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required/>
                </div>
                <div className="form-group">
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Password" required/>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      )
  }