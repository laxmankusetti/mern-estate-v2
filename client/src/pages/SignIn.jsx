import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {

  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

   const {loading, error} = useSelector((state) => state.user)
 
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })
  
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          className="p-3 border focus:outline-none rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border focus:outline-none rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="uppercase bg-sky-600 text-white font-medium rounded-lg p-3">
          { loading ? 'Loading...' : 'Sign Up' }
        </button>
      </form>
      <p className="my-5">
        Dont have an account?
        <Link to="/sign-up">
          <span className="cursor-pointer text-sky-600 ml-2 font-semibold">Sign Up</span>
        </Link>
      </p>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
