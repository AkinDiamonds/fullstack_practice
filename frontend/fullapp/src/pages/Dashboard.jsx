import React, { useEffect, useState } from "react";

const RecordTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/records");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) return <p>Loading records...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Records</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>Date of Birth</th>
            <th style={thStyle}>Occupation</th>
            <th style={thStyle}>State of Origin</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, index) => (
            <tr key={rec.id || index}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{rec.name}</td>
              <td style={tdStyle}>{rec.gender}</td>
              <td style={tdStyle}>{rec.date_of_birth}</td>
              <td style={tdStyle}>{rec.occupation}</td>
              <td style={tdStyle}>{rec.state_of_origin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default RecordTable;
