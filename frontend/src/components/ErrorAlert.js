import React from "react";

export default function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div style={{
      backgroundColor: "#ffebee",
      color: "#c62828",
      padding: "16px",
      margin: "16px 0",
      borderRadius: "4px",
      border: "1px solid #e57373"
    }}>
      {message}
    </div>
  );
}
