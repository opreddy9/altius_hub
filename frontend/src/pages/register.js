import React, { useState } from "react";
// import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  { redirect, Redirect } from 'react-router-dom'
// import AlertColors from '../Alert/AlertColors'


export default function Register (){
    const [formData, setFormData] = useState({
      email: '',
      name: '',
      password: '',
      Repassword: '',
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
        if(!formData.name || !formData.email || !formData.password || !formData.Repassword){
            alert("Fill all fields");
        }

        let regex = 
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
      e.preventDefault();
      try {
        if(formData.password!==formData.Repassword){
            setErrorOccurred(true);
            alert("Passwords donot match");
        }
        if(!regex.test(formData.password)){
            setErrorOccurred(true);
            alert("Passwords must include One uppercase alphabet, One lowercase alphabet, One numerical, One special character");
        }
        else{
        const response = await axios.post('http://localhost:5000/api/register', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(response.status===401){
            alert("User already Exists");
        }
        console.log(response);
        alert(response.status);
        alert(response.data.msg);
        window.localStorage.setItem("Token", response.data.data.token);
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
            {/* {errorOccurred && <AlertColors color="red" text="A success alert for showing message." />} */}
            {curred }
              <form className="m-2" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required/>
                </div>
                <div className="form-group">
                  <input type="text" name="name" value={formData.username} onChange={handleChange} className="form-control" placeholder="Username" required/>
                </div>
                <div className="form-group">
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Password" required/>
                </div>
                <div className="form-group">
                  <input type="password" name="Repassword" value={formData.Repassword} onChange={handleChange} className="form-control" placeholder="rePassword" required/>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Register</button>
              </form>
            </div>
          </div>
        </div>
      )
  }