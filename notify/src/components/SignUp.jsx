import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword:"" });

     let navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}= credentials;

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name,email,password}),
        });
    
        const json = await response.json();
        console.log(json);
    
        if (json.success) {
          localStorage.setItem("token", json.authToken);
          navigate("/");
          props.showAlert("Account created Successfully🎉","success");
        } else {
          props.showAlert("⚠️Invalid email or password. Please try again.","danger");
        }
      };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };  



  return (
    <div className="box ms-auto" onSubmit={handleSubmit}>
    <form>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Username</label>
      <input type="text" className="form-control" id="name" required name="name"onChange={onChange} aria-describedby="emailHelp"/>
    
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email </label>
      <input type="email" className="form-control" id="email"name="email" required onChange={onChange} aria-describedby="emailHelp"/>
     
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" name="password" required onChange={onChange} id="password"/>
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
      <input type="password" className="form-control" name="cpassword" required onChange={onChange}  id="cpassword"/>
    </div>
   
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </div>
  )
}

export default SignUp
