import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import { fetchArticles } from "../services/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles(token);
        setArticles(fetchedArticles);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [token]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress style={{ color: "#f57c00" }} />
      </div>
    );
  }

  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
        {error}
      </p>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(to right, #fceabb, #f8b500)",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{
            color: "#2e2e2e",
            fontWeight: "bold",
            marginBottom: "30px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          🌟 Featured Cricket Articles
        </Typography>

        {articles.length > 0 ? (
          <Grid container spacing={4} justifyContent="center">
            {articles.map((article) => (
              <Grid item xs={12} key={article.id}>
                <Card
                  style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    background: "linear-gradient(135deg, #ffffff, #e0f7fa)",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                    padding: "16px",
                    transition: "transform 0.3s",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      padding: 0,
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: "bold",
                        color: "#00796b",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: "#333",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.6",
                      }}
                    >
                      {article.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" style={{ color: "#444" }}>
            No articles found.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default Articles;
