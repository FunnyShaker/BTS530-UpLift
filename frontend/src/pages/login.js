import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../App.css"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

  e.preventDefault()
  setError("")

  try {

    const response = await axios.post(
      `${API_URL}/api/login`,
      { email, password },
      { withCredentials: true }
    )

    console.log("Login success:", response.data)
    navigate("/home")

  } catch (error) {

    const message = error.response?.data?.message || "Login failed. Please try again."
    setError(message)

  }

}

  return (
    <div className="page">

      <div className="header">
        <div className="logo">Uplift</div>
      </div>

      <div className="content">
        <div className="card">

          <h1>Welcome</h1>
          <p>Sign in to your account</p>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Sign In</button>

          </form>

          <p className="link-text">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>

        </div>
      </div>

      <div className="footer">
        <div className="footer-grid">

          <div>
            <h4>About</h4>
            <p>Our Story</p>
            <p>Careers</p>
            <p>Press</p>
          </div>

          <div>
            <h4>Support</h4>
            <p>Help Center</p>
            <p>Contact Us</p>
            <p>Travel Guide</p>
          </div>

          <div>
            <h4>Legal</h4>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
          </div>

          <div>
            <h4>Connect</h4>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Facebook</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login
