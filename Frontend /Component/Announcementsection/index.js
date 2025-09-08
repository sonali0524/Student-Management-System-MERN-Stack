import React, { useState, useEffect } from "react";
import axios from "axios";

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    // Fetch existing announcements
    axios
      .get("http://localhost:5000/announcements/get")
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the announcements!", error);
      });
  }, []);

  // Handle input changes for title and content
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement((prevAnnouncement) => ({
      ...prevAnnouncement,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the new announcement to the server
    axios
      .post("http://localhost:5000/announcements/add", newAnnouncement, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setAnnouncements([...announcements, response.data.newAnnouncement]);
        setNewAnnouncement({ title: "", content: "" }); // Clear the form
      })
      .catch((error) => {
        console.error("Error adding announcement:", error);
      });
  };

  return (
    <div className="announcement-section" style={{ maxWidth: "800px", margin: "20px auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Announcements</h2>

      {/* Displaying existing announcements */}
      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
        {announcements.map((announcement, index) => (
          <li key={index} style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
            <h4 style={{ fontSize: "18px", color: "#444" }}>{announcement.title}</h4>
            <p style={{ fontSize: "16px", color: "#555" }}>{announcement.content}</p>
            <p style={{ fontStyle: "italic", color: "#777" }}>
              <em>{new Date(announcement.date).toLocaleString()}</em>
            </p>
          </li>
        ))}
      </ul>

      {/* Form to add new announcement */}
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          name="title"
          placeholder="Announcement Title"
          value={newAnnouncement.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "12px", fontSize: "16px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd", backgroundColor: "#fff" }}
        />
        <textarea
          name="content"
          placeholder="Announcement Content"
          value={newAnnouncement.content}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "12px", fontSize: "16px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd", backgroundColor: "#fff", minHeight: "120px" }}
        ></textarea>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Add Announcement
        </button>
      </form>
    </div>
  );
};

export default AnnouncementSection;
