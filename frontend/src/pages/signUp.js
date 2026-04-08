import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../App.css"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

function Signup() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userType: "individual"
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

  e.preventDefault()
  setError("")

  try {

    const response = await axios.post(
      `${API_URL}/api/signup`,
      formData,
      { withCredentials: true }
    )

    console.log("Signup success:", response.data)
    navigate("/home")

  } catch (error) {

    console.error("[SIGNUP] Request failed")
    console.error("[SIGNUP] HTTP status:", error.response?.status)
    console.error("[SIGNUP] Response data:", error.response?.data)
    console.error("[SIGNUP] Request config:", error.config)
    console.error("[SIGNUP] Full error:", error)

    const message = error.response?.data?.message || "Signup failed. Please try again."
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

          <h1>Sky's the limit</h1>
          <p>Create your account and start exploring</p>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <select name="userType" onChange={handleChange}>
              <option value="individual">Individual</option>
              <option value="corporate">Corporate</option>
            </select>

            <button type="submit">Create Account</button>

          </form>

          <p>
            Already have an account? <Link to="/">Sign In</Link>
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

export default Signup
