import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getComparator, applySortFilter } from "../../utils/tableHelpers";
import { getAllEmployees } from "../../services/MediSearchServices/AdminServices";
import UserListHead from "../custom/UserLists/UserListHead";
import UserListToolbar from "../custom/UserLists/UserListToolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const TABLE_HEAD = [
  { id: "name", label: "Nombre", alignRight: false },
  { id: "email", label: "Correo", alignRight: false },
  { id: "phone", label: "Teléfono", alignRight: false },
  { id: "role", label: "Rol", alignRight: false },
  { id: "province", label: "Provincia", alignRight: false },
  { id: "municipality", label: "Municipio", alignRight: false },
  { id: "address", label: "Dirección", alignRight: false },
  { id: "" },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getAllEmployees();
        setUsers(res.data.$values);
      } catch (error) {
        toast.error("Ocurrió un error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <Container sx={{ maxWidth: "90vw" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Usuarios
        </Typography>
        <Button
          component={Link}
          to="add"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nuevo Usuario
        </Button>
      </Stack>
      <Card sx={{ boxShadow: 3, mb: 3, borderRadius: "12px" }}>
        <UserListToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <TableContainer>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: "center",
                        padding: 2,
                      }}
                    >
                      <CircularProgress />
                    </Paper>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      firstName,
                      lastName,
                      role,
                      address,
                      email,
                      municipality,
                      province,
                      phoneNumber,
                      urlImage,
                    } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar
                              alt={firstName}
                              src={`${ASSETS}${urlImage}`}
                              sx={{ marginLeft: 1 }}
                            />
                            <Typography variant="subtitle2" noWrap>
                              {firstName} {lastName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{phoneNumber}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">{province}</TableCell>
                        <TableCell align="left">{municipality}</TableCell>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleOpenMenu}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: "center",
                        padding: 2,
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Usuario no encontrado
                      </Typography>
                      <Typography variant="body2">
                        No hay resultados para: &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
            {users.length && !loading === 0 && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: "center",
                        padding: 2,
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        No hay ningún usuario registrado
                      </Typography>

                      <Button variant="contained" startIcon={<AddIcon />}>
                        Nuevo Usuario
                      </Button>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <EditIcon sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem sx={{ color: "error.main" }}>
          <DeleteIcon sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Container>
  );
};

export default Users;