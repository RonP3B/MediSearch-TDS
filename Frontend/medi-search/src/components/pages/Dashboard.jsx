import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ mb: 5, fontWeight: "bold" }}>
        Bienvenido a MediSearch
      </Typography>
      <div>contenido...</div>
    </Container>
  );
};

export default Dashboard;
