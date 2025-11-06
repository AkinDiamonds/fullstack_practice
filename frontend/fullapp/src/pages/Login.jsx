import React from "react"
import {useState} from "react"
import {useNavigate} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const navigate = useNavigate()


  async function handleLogin (e){
    e.preventDefault()

    const res = await fetch('http://127.0.0.1:8000/user/login', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    })

    console.log(res.ok)

    if(res.ok){
      console.log("You have found yourself in the dashboard")
      navigate('/dashboard')
    }else {alert("Something went wrong!")}
  }

  function gotosignup() {
    navigate("/signup")
  }

  return(
    <>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log in</button>
      </form>

      <button onClick={gotosignup}>Sign up instead</button>
    </>
  )
}

export default Login