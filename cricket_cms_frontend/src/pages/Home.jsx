import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import { fetchArticles, fetchPlayers, fetchLiveScores } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [players, setPlayers] = useState([]);
  const [liveScores, setLiveScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticles = await fetchArticles(token);
        setArticles(fetchedArticles.slice(0, 3));

        const fetchedPlayers = await fetchPlayers(token);
        setPlayers(fetchedPlayers.slice(0, 3));

        const fetchedLiveScores = await fetchLiveScores(token);
        setLiveScores(fetchedLiveScores.slice(0, 3));

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (!token) {
    return <Typography>Please log in to access the home page.</Typography>;
  }

  const cardStyle = {
    height: "auto", // ✅ Auto height based on content
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "16px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
    maxWidth: "350px",
    margin: "0 auto",
  };

  const contentStyle = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const sectionTitleStyle = {
    marginTop: "40px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#333",
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #e3ffe7, #f3f3f3)",
        minHeight: "100vh",
        paddingBottom: "50px",
      }}
    >
      <Container sx={{ py: 4 }}>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          style={{
            color: "#2e2e2e",
            fontWeight: "bold",
            marginBottom: "40px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          🏏 Welcome to Cricket CMS
        </Typography>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        {/* Live Scores */}
        <Typography variant="h5" style={sectionTitleStyle}>
          📊 Latest Live Scores
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {liveScores.length > 0 ? (
            liveScores.map((match, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                style={{ display: "flex" }}
              >
                <Card
                  style={{
                    ...cardStyle,
                    backgroundColor: "#e3f2fd",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <CardHeader
                    title={match.name || "Match Info"}
                    style={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                  <CardContent style={contentStyle}>
                    <Typography>Status: {match.status || "N/A"}</Typography>
                    <Typography>Venue: {match.venue || "N/A"}</Typography>
                    <Typography>Date: {match.date || "N/A"}</Typography>
                    <Divider style={{ margin: "12px 0" }} />
                    {match.score?.map((innings, idx) => (
                      <Typography key={idx}>
                        <strong>{innings.inning}:</strong> {innings.r}/
                        {innings.w} in {innings.o} overs
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No live scores available.</Typography>
          )}
        </Grid>

        {/* Players */}
        <Typography variant="h5" style={sectionTitleStyle}>
          👤 Latest Players
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {players.length > 0 ? (
            players.map((player) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={player.id}
                style={{ display: "flex" }}
              >
                <Card
                  style={{
                    ...cardStyle,
                    backgroundColor: "#f1f8e9",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <CardHeader
                    title={player.name}
                    style={{
                      backgroundColor: "#689f38",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                  <CardContent style={contentStyle}>
                    <Typography>Country: {player.country}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No players available.</Typography>
          )}
        </Grid>

        {/* Articles */}
        <Typography variant="h5" style={sectionTitleStyle}>
          📰 Latest Articles
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={article.id}
                style={{ display: "flex" }}
              >
                <Card
                  style={{
                    ...cardStyle,
                    backgroundColor: "#fff3e0",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <CardHeader
                    title={article.title}
                    style={{
                      backgroundColor: "#f57c00",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                  <CardContent style={contentStyle}>
                    <Typography
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {article.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No articles available.</Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
