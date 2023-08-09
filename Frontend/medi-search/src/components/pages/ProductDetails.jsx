import { useState, useEffect, useRef } from "react";
import { alpha } from "@mui/material/styles";
import { useParams, useNavigate, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import {
  addComment,
  addReply,
} from "../../services/MediSearchServices/ProductServices";
import { getCompanyProduct } from "../../services/MediSearchServices/HomeServices";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import CommentsAccordion from "../custom/Comments/CommentsAccordion";
import Comment from "../custom/Comments/Comment";
import CommentTextbox from "../custom/Comments/CommentTextbox";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import BusinessIcon from "@mui/icons-material/Business";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const ProductDetails = ({ logged, showCompanyInfo, isCompany }) => {
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

    const fetchProduct = async () => {
      try {
        const res = await getCompanyProduct(id);

        setProduct(res.data);
        setImages(res.data.images.$values.map((url) => ASSETS + url));
        setComments(res.data.comments.$values);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return navigate(-1);
        showToastRef.current(
          "Ocurrió un error al obtener la información del producto, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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

  const imagesArr = images.map((image) => {
    return { original: image, thumbnail: image };
  });

  const productInfo = [
    { label: "Nombre:", value: product.name },
    { label: "Precio:", value: `RD$ ${product.price}` },
    { label: "Cantidad disponible:", value: product.quantity },
    { label: "Clasificación:", value: product.classification },
    {
      label: "Categorías:",
      value: product.categories?.$values.map((category) => category).join(", "),
    },
    { label: "Descripción:", value: product.description },
  ];

  return (
    <Container maxWidth="xl" sx={{ mb: 2, mt: isCompany ? 0 : 3 }}>
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
                <Box className="custom-gallery-container">
                  <ImageGallery items={imagesArr} />
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
                    maxHeight: "470px",
                    maxWidth: "100%",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} sx={{ overflowWrap: "anywhere" }}>
              {!showCompanyInfo && (
                <Divider sx={{ my: 1, display: { md: "none" } }} />
              )}
              {showCompanyInfo && (
                <>
                  <Box
                    sx={{
                      border: (theme) =>
                        `3px solid ${theme.palette.primary.main}`,
                      borderRadius: "12px",
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.light, 0.1),
                      maxWidth: 500,
                      margin: "0 auto",
                      padding: 1.5,
                    }}
                  >
                    <Box display="flex">
                      <Avatar
                        alt="Foto de la empresa"
                        src={`${ASSETS}${product.logo}`}
                        sx={{
                          border: (theme) =>
                            `2px solid ${theme.palette.primary.main}`,
                          width: 80,
                          height: 80,
                        }}
                      />
                      <Box ml={2}>
                        <Typography variant="h5">
                          {product.nameCompany}
                        </Typography>
                        <Typography variant="body2">
                          {product.province}, {product.municipality}
                        </Typography>
                      </Box>
                    </Box>
                    {logged && (
                      <Button
                        component={Link}
                        to={`/${
                          isCompany ? "company" : "client"
                        }/chat?receiverId=${product.companyId}&product=${
                          product.name
                        }`}
                        fullWidth
                        variant="contained"
                        startIcon={<MarkUnreadChatAltIcon />}
                        sx={{ mt: 1 }}
                      >
                        Chatear con el vendedor
                      </Button>
                    )}
                    <Button
                      component={Link}
                      to={`/${
                        isCompany
                          ? "company"
                          : logged
                          ? "client/companies"
                          : "companies"
                      }/company-details/${product.companyId}`}
                      fullWidth
                      variant="outlined"
                      startIcon={<BusinessIcon />}
                      sx={{ mt: 1 }}
                    >
                      Ver perfil del vendedor
                    </Button>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                </>
              )}
              {productInfo.map((info, index) => {
                const lastIndex = productInfo.length - 1;

                return (
                  <Box key={index}>
                    <Box
                      sx={{
                        mb: 1.5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        sx={{
                          letterSpacing: "0.1rem",
                          mr: 0.75,
                          fontWeight: "bold",
                        }}
                        label={info.label}
                        color="primary"
                      />
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {info.value}
                      </Typography>
                    </Box>
                    {lastIndex !== index && <Divider sx={{ my: 1 }} />}
                  </Box>
                );
              })}
              <Divider sx={{ my: 1, display: { md: "none" } }} />
            </Grid>
          </Grid>
          <CommentsAccordion>
            {logged && (
              <CommentTextbox
                label="Escribe un comentario"
                sx={{ mb: 1 }}
                onClick={sendComment}
                show={true}
                sendingComment={sendingComment}
              />
            )}
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
                      logged={logged}
                    />
                    <Box sx={{ ml: "2rem" }}>
                      {logged && (
                        <CommentTextbox
                          label="Escribe una respuesta"
                          sx={{ mb: 1.5 }}
                          onClick={sendReply}
                          show={showReplyTextBox}
                          sendingComment={sendingReply}
                          parentCommentId={comment.id}
                        />
                      )}
                      {replies.length > 0 &&
                        replies.map((reply) => (
                          <Comment
                            key={reply.id}
                            userName={reply.ownerName}
                            userAvatar={`${ASSETS}${reply.ownerImage}`}
                            comment={reply.content}
                            isReply={true}
                            logged={logged}
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
  showCompanyInfo: PropTypes.bool.isRequired,
  isCompany: PropTypes.bool.isRequired,
};

export default ProductDetails;
