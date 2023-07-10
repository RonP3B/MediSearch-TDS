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
import CircularProgress from "@mui/material/CircularProgress";
import InputField from "../custom/InputFields/InputField";
import MultipleSelectField from "../custom/InputFields/MultipleSelectField";
import useProductFormik from "../../hooks/formiks/useProductFormik";
import MultipleFileInputField from "../custom/InputFields/MultipleFileInputField";
import { getProduct } from "../../services/MediSearchServices/ProductServices";
import ImageSlider from "../custom/ImageSlider/ImageSlider";

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

        if (isMounted) {
          setProduct(res.data);
          setImages(res.data.urlImages.$values.map((url) => ASSETS + url));
        }
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;

        if (error.response.status === 404) {
          return navigate("/company/product/no-product");
        }

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
  }, [showToastRef, edit, id, navigate]);

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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
                  <ImageSlider images={images} width={200} height={150} />
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
                    <MultipleSelectField
                      label="Categorías"
                      name="categories"
                      variant="filled"
                      margin="dense"
                      fullWidth
                      options={["a", "b", "c"]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MultipleSelectField
                      label="Componentes"
                      name="components"
                      variant="filled"
                      margin="dense"
                      fullWidth
                      options={["s", "z", "x"]}
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
