import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [input,setInput]=useState({
    username:"",
    password:"",
  }) 
  const [err,SetErr]=useState(null)
  const navigation=useNavigate()
  const handlechange=(e)=>{
setInput((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleLogin =async (e) => {
e.preventDefault()
    try{
        await login(input);
        navigation('/')
    }catch(err){
      SetErr(err.response.data)
    }

  };
console.log(err)
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handlechange} />
            <input type="password" placeholder="Password" name="password"  onChange={handlechange}/>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
