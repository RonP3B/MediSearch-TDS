import { useState } from "react";
import { Formik, Form } from "formik";
import SubmitButton from "../custom/Buttons/SubmitButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputField from "../custom/InputFields/InputField";
import MultipleSelectField from "../custom/InputFields/MultipleSelectField";
import useProductFormik from "../../hooks/formiks/useProductFormik";
import MultipleFileInputField from "../custom/InputFields/MultipleFileInputField";

const SaveProduct = () => {
  const [loading, setLoading] = useState(false);
  const { initialValues, validationSchema, onSubmit } =
    useProductFormik(setLoading);

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ mb: 5, fontWeight: "bold" }}>
        Crear producto
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MultipleFileInputField
                  accept="image/*"
                  label="Imagenes"
                  name="images"
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
                loading={loading}
                text="Crear producto"
                loadingText="Creando producto..."
                variant="contained"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SaveProduct;
