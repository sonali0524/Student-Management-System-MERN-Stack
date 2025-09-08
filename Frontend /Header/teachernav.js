
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/jscoelogo.png"; // Your logo file
import { FaUserCircle } from "react-icons/fa"; // Install react-icons if not already done

function TeacherHeader() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // Check if the teacher is logged in on page load
    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUserName = localStorage.getItem('userName');
        const storedSubjectName = localStorage.getItem('subjectName');

        if (storedIsLoggedIn === 'true' && storedUserName) {
            setIsLoggedIn(true);
            setUserName(storedUserName);
            setSubjectName(storedSubjectName); // Set the subject name
        }
    }, []);

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('subjectName'); // Remove subject name from localStorage
        setIsLoggedIn(false);
        setUserName("");
        setSubjectName(""); // Reset subject name
        navigate('/login'); // Redirect to login page after logout
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img
                        className="img-fluid"
                        src={logo}
                        alt="Logo"
                        style={{ width: "3rem" }}
                    />
                </a>

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

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/dashboard/teacher">
                                Home
                            </a>
                        </li>
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/add-student">
                                        Add Student
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/list">
                                        List
                                    </a>
                                </li>
                               
                            </>
                        )}
                    </ul>

                    {isLoggedIn && (
                        <div className="d-flex align-items-center">
                            <FaUserCircle
                                size={30}
                                style={{ cursor: "pointer" }}
                                onClick={toggleDropdown}
                            />
                            {showDropdown && (
                                <div className="dropdown-menu dropdown-menu-end show" style={{ position: "absolute", right: "10px", top: "60px" }}>
                                    <span className="dropdown-item-text fw-bold">Teacher Name: {userName}</span>
                                    <span className="dropdown-item-text fw-bold">Subject: {subjectName}</span> {/* Display subject name */}
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

export default TeacherHeader;
