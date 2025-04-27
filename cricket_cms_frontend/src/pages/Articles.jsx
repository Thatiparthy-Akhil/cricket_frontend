import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../services/api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({
    title: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles(token);

        // Add a `liked` property to each article for frontend-only tracking
        const articlesWithLikes = fetchedArticles.map((article) => ({
          ...article,
          liked: false, // Default to not liked
        }));

        setArticles(articlesWithLikes);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Determine if the user is an admin
    const checkAdminStatus = () => {
      const userRole = JSON.parse(atob(token.split(".")[1])).role; // Decode JWT to get role
      setIsAdmin(userRole === "admin"); // Set `isAdmin` if role is "admin"
    };

    loadArticles();
    checkAdminStatus();
  }, [token]);

  const handleOpenModal = (article = { title: "", content: "" }) => {
    setCurrentArticle(article);
    setIsEditing(!!article.id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentArticle({ title: "", content: "" });
  };

  const handleSaveArticle = async () => {
    try {
      if (isEditing) {
        await updateArticle(token, currentArticle.id, currentArticle);
        setArticles((prev) =>
          prev.map((article) =>
            article.id === currentArticle.id ? currentArticle : article
          )
        );
      } else {
        const newArticle = await createArticle(token, currentArticle);
        setArticles((prev) => [...prev, newArticle]);
      }
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      await deleteArticle(token, id);
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleLike = (id) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? {
              ...article,
              liked: !article.liked, // Toggle the liked state
            }
          : article
      )
    );
  };

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
        {isAdmin && ( // Show only if the user is an admin
          <Button
            variant="contained"
            style={{ marginBottom: "20px", backgroundColor: "#00796b" }}
            onClick={() => handleOpenModal()}
          >
            Add Article
          </Button>
        )}
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
                  }}
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
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: "#333",
                        lineHeight: "1.6",
                      }}
                    >
                      {article.content}
                    </Typography>
                  </CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px",
                    }}
                  >
                    {isAdmin && ( // Show Edit and Delete buttons only for admins
                      <>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenModal(article)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteArticle(article.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <IconButton
                        color={article.liked ? "error" : "default"} // Change color based on liked state
                        onClick={() => handleToggleLike(article.id)}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </div>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" style={{ color: "#444" }}>
            No articles found.
          </Typography>
        )}

        {/* Modal for Add/Edit */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>
            {isEditing ? "Edit Article" : "Add Article"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={currentArticle.title}
              onChange={(e) =>
                setCurrentArticle((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <TextField
              label="Content"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={currentArticle.content}
              onChange={(e) =>
                setCurrentArticle((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveArticle} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Articles;
