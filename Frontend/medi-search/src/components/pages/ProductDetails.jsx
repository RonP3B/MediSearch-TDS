import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import {
  addComment,
  addReply,
  getProduct,
} from "../../services/MediSearchServices/ProductServices";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import ImageSlider from "../custom/ImageSlider/ImageSlider";
import CommentsAccordion from "../custom/Comments/CommentsAccordion";
import Comment from "../custom/Comments/Comment";
import CommentTextbox from "../custom/Comments/CommentTextbox";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const ProductDetails = ({ logged, client }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState({});
  const [activeReplyIndex, setActiveReplyIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [sendingComment, setSendingComment] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  useEffect(() => {
    console.count("ProductDetails.jsx"); //borrame
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const res = await getProduct(id);

        if (isMounted) {
          setProduct(res.data);
          setImages(res.data.urlImages.$values.map((url) => ASSETS + url));
          setComments(res.data.comments.$values);
        }
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;

        if (error.response.status === 404) return navigate(-1);

        showToastRef.current(
          "Ocurrió un error al obtener la información del producto, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [showToastRef, id, navigate]);

  const sendComment = async (content, setTextboxVal) => {
    try {
      setSendingComment(true);
      const res = await addComment({ content, productId: id });
      setComments((prevComments) => [...prevComments, res.data]);
      showToast("Comentario agregado", { type: "success" });
      setTextboxVal("");
    } catch (error) {
      showToast(
        "Ocurrió un error al intentar comentar, informelo al equipo técnico",
        { type: "error" }
      );
    } finally {
      setSendingComment(false);
    }
  };

  const sendReply = async (content, setTextboxVal, commentId) => {
    try {
      setSendingReply(true);
      const res = await addReply({ content, commentId });

      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === commentId) {
            comment.replies.$values.push(res.data);
          }
          return comment;
        });
      });

      showToast("Respuesta agregada", { type: "success" });
      setTextboxVal("");
    } catch (error) {
      showToast(
        "Ocurrió un error al intentar responder, informelo al equipo técnico",
        { type: "error" }
      );
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Button
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate(-1)}
      >
        Volver
      </Button>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          {product.name}
        </Typography>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              {images.length > 1 ? (
                <Box>
                  <ImageSlider
                    images={images}
                    width="100%"
                    height="400px"
                    elevation={3}
                  />
                </Box>
              ) : (
                <Box
                  component="img"
                  src={images[0]}
                  sx={{
                    border: "2px solid",
                    borderColor: "primary.main",
                    minHeight: "200px",
                    minWidth: "200px",
                    maxHeight: "400px",
                    maxWidth: "100%",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} sx={{ overflowWrap: "anywhere" }}>
              <Divider sx={{ my: 1, display: { md: "none" } }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1.5 }}
              >
                <Chip
                  sx={{ letterSpacing: "0.1rem" }}
                  label="Nombre:"
                  color="primary"
                />{" "}
                {product.name}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1.5 }}
              >
                <Chip
                  sx={{ letterSpacing: "0.1rem" }}
                  label="Precio:"
                  color="primary"
                />{" "}
                ${product.price}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1.5 }}
              >
                <Chip
                  sx={{ letterSpacing: "0.1rem" }}
                  label="Cantidad disponible:"
                  color="primary"
                />{" "}
                {product.quantity}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1.5 }}
              >
                <Chip
                  sx={{ letterSpacing: "0.1rem" }}
                  label="Clasificación:"
                  color="primary"
                />{" "}
                {product.classification}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1.5 }}
              >
                <Chip
                  sx={{ letterSpacing: "0.1rem" }}
                  label="Categorías:"
                  color="primary"
                />{" "}
                {product.categories.$values
                  .map((category) => category)
                  .join(", ")}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1.5 }}>
                <Chip
                  sx={{ letterSpacing: "0.1rem" }}
                  label="Descripción:"
                  color="primary"
                />{" "}
                {product.description}
              </Typography>
              <Divider sx={{ my: 1, display: { md: "none" } }} />
            </Grid>
          </Grid>
          <CommentsAccordion>
            <CommentTextbox
              label="Escribe un comentario"
              sx={{ mb: 1 }}
              onClick={sendComment}
              show={true}
              sendingComment={sendingComment}
            />
            {comments.length > 0 ? (
              comments.map((comment, index) => {
                const replies = comment.replies.$values;
                const showReplyTextBox = activeReplyIndex === index;

                return (
                  <Box key={comment.id}>
                    <Comment
                      userName={comment.ownerName}
                      userAvatar={`${ASSETS}${comment.ownerImage}`}
                      onClick={() =>
                        activeReplyIndex === index
                          ? setActiveReplyIndex(-1)
                          : setActiveReplyIndex(index)
                      }
                      comment={comment.content}
                      isReply={false}
                    />
                    <Box sx={{ ml: "2rem" }}>
                      <CommentTextbox
                        label="Escribe una respuesta"
                        sx={{ mb: 1.5 }}
                        onClick={sendReply}
                        show={showReplyTextBox}
                        sendingComment={sendingReply}
                        parentCommentId={comment.id}
                      />
                      {replies.length > 0 &&
                        replies.map((reply) => (
                          <Comment
                            key={reply.id}
                            userName={reply.ownerName}
                            userAvatar={`${ASSETS}${reply.ownerImage}`}
                            comment={reply.content}
                            isReply={true}
                          />
                        ))}
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CommentsDisabledIcon
                  sx={{ fontSize: 75, color: "primary.main" }}
                />
                <Typography variant="body2">No hay comentarios</Typography>
              </Box>
            )}
          </CommentsAccordion>
        </>
      )}
    </Container>
  );
};

ProductDetails.propTypes = {
  logged: PropTypes.bool.isRequired,
  client: PropTypes.bool.isRequired,
};

export default ProductDetails;
