import React, { useEffect, useState } from "react";
import { fetchPlayers } from "../services/api";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const fetchedPlayers = await fetchPlayers(token);
        setPlayers(fetchedPlayers);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    loadPlayers();
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
        background: "linear-gradient(to right, #fceabb, #f8b500)",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#333",
          marginBottom: "40px",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        🏏 Players List
      </h1>

      {players.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {players.map((player) => (
            <div
              key={player.id}
              style={{
                background: "#f1f8e9",
                borderRadius: "16px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                width: "250px",
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
                  fontSize: "1.5rem",
                  color: "#33691e",
                  marginBottom: "10px",
                }}
              >
                {player.name}
              </h2>
              <p style={{ fontSize: "1rem", color: "#555" }}>
                Country: <strong>{player.country}</strong>
              </p>
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
          No players found.
        </p>
      )}
    </div>
  );
};

export default Players;
