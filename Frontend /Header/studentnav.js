import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/jscoelogo.png"; // Replace with your logo path
import { FaUserCircle } from "react-icons/fa"; // Import user icon from react-icons

function StudentHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [rollNo, setRollNo] = useState(""); // State for Roll Number
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load student data from localStorage
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");
    const storedRollNo = localStorage.getItem("rollno");

    console.log("Stored isLoggedIn:", storedIsLoggedIn);
    console.log("Stored userName:", storedUserName);
    console.log("Stored rollNo:", storedRollNo);

    if (storedIsLoggedIn === "true" && storedUserName && storedRollNo) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
      setRollNo(storedRollNo);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all data from localStorage
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  const handleResetPassword = () => {
    navigate("/resetpassword"); // Redirect to reset password page
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  console.log("isLoggedIn state:", isLoggedIn); // Debugging state

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/dashboard/student">
          <img
            className="img-fluid"
            src={logo}
            alt="Logo"
            style={{ width: "3rem" }}
          />
        </a>

        {/* Navbar Toggler for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/dashboard/student">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/announcements">
                Announcements
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/studentinfo">
                My Profile
              </a>
            </li>
           
          </ul>

          {/* Right Corner: User Icon and Dropdown */}
          {isLoggedIn && (
            <div className="d-flex align-items-center">
              <FaUserCircle
                size={30}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  zIndex: 10, // Add z-index to make sure it stays on top
                }}
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div
                  className="dropdown-menu dropdown-menu-end show"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "60px",
                    zIndex: 1050, // Ensure the dropdown is above other content
                  }}
                >
                  <div className="dropdown-item-text fw-bold">
                    Name: {userName}
                  </div>
                  <div className="dropdown-item-text">Roll No: {rollNo}</div>
                  <button
                    className="dropdown-item text-primary"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default StudentHeader;
