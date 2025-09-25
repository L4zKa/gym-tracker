import React from "react";

export default function FrogTheme() {
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom, #064e3b, #065f46)", // dunkelgrün
    padding: "20px",
  };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "rgba(6, 78, 59, 0.85)", // halbtransparent dunkelgrün
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    border: "4px solid #047857", // helleres Grün
    color: "#d1fae5",
    padding: "24px",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "16px",
  };

  const textStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "24px",
    color: "#a7f3d0",
  };

  const subCardStyle: React.CSSProperties = {
    backgroundColor: "rgba(5, 150, 105, 0.9)",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    marginBottom: "16px",
  };

  const buttonRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
  };

  const buttonStyle = (bg: string, hover: string): React.CSSProperties => ({
    flex: 1,
    backgroundColor: bg,
    color: "#064e3b",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
    transition: "0.2s",
  });

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>🐸 Frog Gym Tracker</h1>
        <p style={textStyle}>Verspieltes Mockup im „Frosch-Vivarium“-Stil.</p>

        <div style={subCardStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>Heute</h2>
          <p>Trainingstag: 25.09.2025</p>
        </div>

        <div style={buttonRowStyle}>
          <button style={buttonStyle("#facc15", "#fde047")}>+ Übung</button>
          <button style={buttonStyle("#a3e635", "#bef264")}>Plan starten</button>
        </div>
      </div>
    </div>
  );
}
