import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useToast from "../../hooks/feedback/useToast";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import SubmitButton from "../custom/Buttons/SubmitButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import InputField from "../custom/InputFields/InputField";
import MultipleSelectField from "../custom/InputFields/MultipleSelectField";
import SelectInputField from "../custom/InputFields/SelectInputField";
import useProductFormik from "../../hooks/formiks/useProductFormik";
import MultipleFileInputField from "../custom/InputFields/MultipleFileInputField";
import { getProduct } from "../../services/MediSearchServices/ProductServices";
import ImageSlider from "../custom/ImageSlider/ImageSlider";
import useClassificationCategories from "../../hooks/useClassificationCategories";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const SaveProduct = ({ edit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(edit);
  const [submitLoading, setSubmitLoading] = useState(false);
  const showToast = useToast();
  const showToastRef = useRef(showToast);
  const formikRef = useRef(null);

  const {
    classifications,
    categories,
    setSelectedClassification,
    categoriesSelect,
    classificationsSelect,
  } = useClassificationCategories();

  const { getInitialValues, getEditInitialValues, validationSchema, onSubmit } =
    useProductFormik(setSubmitLoading, edit);

  const resetFormValues = () => {
    formikRef.current.resetForm();
  };

  useEffect(() => {
    console.count("SaveProduct.jsx"); //borrame
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const res = await getProduct(id);
        const productRes = res.data;

        if (isMounted) {
          setProduct(productRes);
          setImages(productRes.urlImages.$values.map((url) => ASSETS + url));
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

    edit && fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [showToastRef, edit, id, navigate, setSelectedClassification]);

  useEffect(() => {
    if (product && edit) {
      setSelectedClassification(product.classification);
    }
  }, [product, setSelectedClassification, edit]);

  useEffect(() => {
    if (!edit) {
      resetFormValues();
      setImages([]);
    }
  }, [edit]);

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ mb: 5, fontWeight: "bold" }}>
        {edit ? "Editar" : "Crear"} producto
      </Typography>
      {edit && (
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      )}
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
          {images.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {images.length > 1 ? (
                <>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Imagenes seleccionadas:
                  </Typography>
                  <ImageSlider
                    images={images}
                    width="200px"
                    height="150px"
                    elevation={2}
                  />
                </>
              ) : (
                <>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Imagen seleccionada:
                  </Typography>
                  <Box
                    component="img"
                    src={images[0]}
                    width={200}
                    height={150}
                    sx={{
                      border: "2px solid",
                      borderColor: "primary.main",
                    }}
                  />
                </>
              )}
            </Box>
          )}
          <Formik
            enableReinitialize={true}
            initialValues={
              edit ? getEditInitialValues(product) : getInitialValues()
            }
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            innerRef={formikRef}
          >
            {() => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <MultipleFileInputField
                      accept="image/*"
                      label="Imagenes"
                      name="images"
                      setImages={setImages}
                      margin="dense"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      name="name"
                      label="Nombre del producto"
                      margin="dense"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectInputField
                      label="Clasificación"
                      name="classification"
                      variant="filled"
                      margin="dense"
                      fullWidth
                      options={["", ...classifications]}
                      setSelected={setSelectedClassification}
                      ref={classificationsSelect}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MultipleSelectField
                      label="Categorías"
                      name="categories"
                      variant="filled"
                      margin="dense"
                      fullWidth
                      disabled={categories.length === 0}
                      options={categories}
                      ref={categoriesSelect}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      name="price"
                      label="Precio"
                      type="number"
                      margin="dense"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      name="quantity"
                      label="Cantidad"
                      type="number"
                      margin="dense"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name="description"
                      label="Descripción del producto"
                      margin="dense"
                      variant="filled"
                      multiline
                      maxRows={4}
                      minRows={4}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="end" mt="20px">
                  <SubmitButton
                    loading={submitLoading}
                    text={`${edit ? "Editar" : "Crear"} producto`}
                    loadingText={`${edit ? "Editando" : "Creando"} producto...`}
                    variant="contained"
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Container>
  );
};

SaveProduct.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default SaveProduct;
