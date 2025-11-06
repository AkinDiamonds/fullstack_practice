import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup(){
  const [name, setName]= useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const navigate = useNavigate()


  async function handleSignUp(e) {
    e.preventDefault()
    const res = await fetch("http://127.0.0.1:8000/user/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, email, password}),
    });
    if (res.ok){
      alert('SignUp succesfull')
      navigate('/')
    }else {alert('Signup Failed')}
  }

  return (
    <form onSubmit={handleSignUp}>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="email" onChange={(e) => setEmail (e.target.value)} />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
      <button type="submit"> Signup </button>
    </form>
  )
}
export default Signup