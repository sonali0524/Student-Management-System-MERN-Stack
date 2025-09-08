import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TeacherHeader from "../../Components/Header/teachernav";

const ShowOne = () => {
  const { id: rawId } = useParams();
  const id = rawId ? rawId.trim() : "";
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    nim: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: { street: "", city: "", state: "", zip: "" },
    marks: [],
    attendance: "",
    percentage: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error("Invalid ID");
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8070/student/get/${id}`);
        const fetchedUser = response.data || {};

        setUser({
          name: fetchedUser.name || "",
          nim: fetchedUser.nim || "",
          gender: fetchedUser.gender || "",
          contactNumber: fetchedUser.contactNumber || "",
          email: fetchedUser.email || "",
          attendance: fetchedUser.attendance || 0,
          address: fetchedUser.address || { street: "", city: "", state: "", zip: "" },
          marks: fetchedUser.marks || [],
          percentage: calculatePercentage(fetchedUser.marks || []),
        });
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        Swal.fire("Error", "Failed to fetch user details.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const calculatePercentage = (marks) => {
    if (marks.length === 0) return 0;
    const totalMarks = marks.reduce((acc, mark) => acc + (parseInt(mark.score) || 0), 0);
    return (totalMarks / (marks.length * 100)) * 100;
  };

  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleAddressChange = (field, value) => {
    setUser({ ...user, address: { ...user.address, [field]: value } });
  };

  const handleMarksChange = (index, field, value) => {
    const updatedMarks = [...user.marks];
  
    if (field === "score") {
      const numericValue = parseInt(value, 10);
  
      if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
        Swal.fire("Validation Error", "Marks must be between 0 and 100.", "warning");
        return;
      }
    }
  
    updatedMarks[index][field] = value;
    setUser({ ...user, marks: updatedMarks, percentage: calculatePercentage(updatedMarks) });
  };

  const addMarkField = () => {
    if (user.marks.length >= 5) {
      Swal.fire("Limit Reached", "You can add only 5 subjects.", "warning");
      return;
    }
    setUser((prevUser) => ({
      ...prevUser,
      marks: [...prevUser.marks, { subject: "", score: "" }],
    }));
  };

  const removeMarkField = (index) => {
    setUser((prevUser) => ({
      ...prevUser,
      marks: prevUser.marks.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!user.name || !user.nim || !user.gender || !user.contactNumber) {
      Swal.fire("Validation Error", "Please fill in all required fields.", "warning");
      return false;
    }

    const rollNumberRegex = /^[1-4]{1}[1-2]{1}[0-9]{2}$/;
    if (!rollNumberRegex.test(user.nim)) {
      Swal.fire("Validation Error", "Please enter a valid roll number (e.g., 3154 for 3rd year, Div A, Roll number 54).", "warning");
      return false;
    }

    for (let mark of user.marks) {
      if (typeof mark.subject !== "string" || mark.subject.trim() === "") {
        Swal.fire("Validation Error", "Subject names must be strings.", "warning");
        return false;
      }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (user.email && !emailRegex.test(user.email)) {
      Swal.fire("Validation Error", "Please enter a valid email address.", "warning");
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const sanitizedUser = {
      ...user,
      address: user.address || { street: "", city: "", state: "", zip: "" },
      marks: user.marks || [],
    };

    try {
      await axios.put(`http://localhost:8070/student/update/${id}`, sanitizedUser);
      Swal.fire("Success", "User details updated successfully.", "success");
      navigate("/showone");
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      Swal.fire("Error", "Failed to update user details.", "error");
    }
  };

  if (loading) return <p>Loading...</p>;

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f9", // Light background color
    padding: "20px",
  };

  const formStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#fff", // White background for the form
    padding: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };

  const formFieldStyle = {
    marginBottom: "15px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0 10px",
    borderRadius: "4px",
    border: "1px solid #ccc", // Light border
  };

  const selectStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0 10px",
    borderRadius: "4px",
    border: "1px solid #ccc", // Same border for selects
  };

  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#007BFF", // Primary Blue
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const submitButtonStyle = {
    padding: "10px 15px",
    backgroundColor: "#28a745", // Green
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const nimYear = user.nim ? user.nim.charAt(0) : "";
  const nimDiv = user.nim ? user.nim.charAt(1) : "";
  const nimRoll = user.nim ? user.nim.slice(2) : "";

  return (
    <div style={containerStyle}>
      <TeacherHeader />
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Edit Student</h1>
      <form onSubmit={handleFormSubmit} style={formStyle}>
        {/* Name Field */}
        <div style={formFieldStyle}>
          <label>Name</label>
          <input
            type="text"
            value={user.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Roll Number Fields */}
        <div style={formFieldStyle}>
          <label>Roll No</label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <label>Year</label>
              <select
                value={nimYear || ""}
                onChange={(e) => handleInputChange("nim", `${e.target.value}${nimDiv}${nimRoll}`)}
                style={selectStyle}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            <div>
              <label>Division</label>
              <select
                value={nimDiv || ""}
                onChange={(e) => handleInputChange("nim", `${nimYear}${e.target.value}${nimRoll}`)}
                style={selectStyle}
              >
                <option value="">Select Division</option>
                <option value="1">Div A</option>
                <option value="2">Div B</option>
              </select>
            </div>

            <div>
              <label>Roll Number</label>
              <input
                type="number"
                value={nimRoll || ""}
                onChange={(e) => handleInputChange("nim", `${nimYear}${nimDiv}${e.target.value}`)}
                min="1"
                max="99"
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Gender Field */}
        <div style={formFieldStyle}>
          <label>Gender</label>
          <select
            value={user.gender || ""}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            style={selectStyle}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Contact Number Field */}
        <div style={formFieldStyle}>
          <label>Contact Number</label>
          <input
            type="text"
            value={user.contactNumber || ""}
            onChange={(e) => handleInputChange("contactNumber", e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Email Field */}
        <div style={formFieldStyle}>
          <label>Email</label>
          <input
            type="email"
            value={user.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Address Fields */}
        <div style={formFieldStyle}>
          <label>Address</label>
          <input
            type="text"
            value={user.address.street || ""}
            onChange={(e) => handleAddressChange("street", e.target.value)}
            placeholder="Street"
            style={inputStyle}
          />
          <input
            type="text"
            value={user.address.city || ""}
            onChange={(e) => handleAddressChange("city", e.target.value)}
            placeholder="City"
            style={inputStyle}
          />
          <input
            type="text"
            value={user.address.state || ""}
            onChange={(e) => handleAddressChange("state", e.target.value)}
            placeholder="State"
            style={inputStyle}
          />
          <input
            type="text"
            value={user.address.zip || ""}
            onChange={(e) => handleAddressChange("zip", e.target.value)}
            placeholder="ZIP Code"
            style={inputStyle}
          />
        </div>

        {/* Marks Fields */}
        <div style={formFieldStyle}>
          <label>Marks</label>
          {user.marks.map((mark, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
              <input
                type="text"
                value={mark.subject || ""}
                onChange={(e) => handleMarksChange(index, "subject", e.target.value)}
                placeholder="Subject"
                style={{ ...inputStyle, flex: 1 }}
              />
              <input
                type="number"
                value={mark.score || ""}
                onChange={(e) => handleMarksChange(index, "score", e.target.value)}
                min="0"
                max="100"
                placeholder="Score"
                style={{ ...inputStyle, width: "100px", marginLeft: "10px" }}
              />
              <button
                type="button"
                onClick={() => removeMarkField(index)}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#dc3545", // Red for delete button
                  marginLeft: "10px",
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addMarkField} style={buttonStyle}>
            Add Subject
          </button>
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: "center" }}>
          <button type="submit" style={submitButtonStyle}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShowOne;
