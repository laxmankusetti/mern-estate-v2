import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })
  
      const data = await res.json();
      if(data.success === false){
        setError(data.message)
        setLoading(false)
        return
      }
      setError(null)
      setLoading(false)
      navigate('/sign-in')
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="p-3 border focus:outline-none rounded-lg"
          id="username"
          onChange={handleChange}
        />
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
        <OAuth />
      </form>
      <p className="my-5">
        already have an account?
        <Link to="/sign-in">
          <span className="cursor-pointer text-sky-600 ml-2 font-semibold">Sign In</span>
        </Link>
      </p>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
