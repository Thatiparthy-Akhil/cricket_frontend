import React, { useEffect, useState } from "react";
import { fetchLiveScores } from "../services/api";

const LiveScores = () => {
  const [liveScores, setLiveScores] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadLiveScores = async () => {
      try {
        const fetchedLiveScores = await fetchLiveScores(token);
        console.log("API Response:", fetchedLiveScores);
        if (Array.isArray(fetchedLiveScores)) {
          setLiveScores(fetchedLiveScores);
        } else {
          throw new Error("Invalid data format received from API.");
        }
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    loadLiveScores();
  }, [token]);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(to right, #d7ffd9, #fceabb)",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#1b5e20",
          marginBottom: "40px",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        🏏 Live Scores
      </h1>

      {liveScores.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {liveScores.map((match, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#e3f2fd",
                borderRadius: "16px",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                padding: "20px",
                width: "300px",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h2
                style={{
                  fontSize: "1.3rem",
                  color: "#0d47a1",
                  marginBottom: "10px",
                }}
              >
                {match.name || "Match details not available"}
              </h2>
              <p style={{ margin: "4px 0", color: "#333" }}>
                <strong>Status:</strong> {match.status || "N/A"}
              </p>
              <p style={{ margin: "4px 0", color: "#333" }}>
                <strong>Venue:</strong> {match.venue || "N/A"}
              </p>
              <p style={{ margin: "4px 0", color: "#333" }}>
                <strong>Date:</strong> {match.date || "N/A"}
              </p>
              <div style={{ marginTop: "10px" }}>
                {match.score?.length > 0 ? (
                  match.score.map((innings, idx) => (
                    <p
                      key={idx}
                      style={{
                        backgroundColor: "#bbdefb",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        margin: "6px 0",
                        color: "#1a237e",
                      }}
                    >
                      <strong>{innings.inning}:</strong> {innings.r}/{innings.w}{" "}
                      in {innings.o} overs
                    </p>
                  ))
                ) : (
                  <p style={{ color: "#888" }}>
                    No score information available
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "#444",
            fontSize: "1.2rem",
            marginTop: "20px",
          }}
        >
          No live scores found.
        </p>
      )}
    </div>
  );
};

export default LiveScores;
