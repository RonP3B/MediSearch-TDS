import { useState, useEffect, useRef } from "react";
import { getAllCompanies } from "../../../services/MediSearchServices/HomeServices";
import {
  getChats,
  sendMessage,
} from "../../../services/MediSearchServices/ChatServices";
import useToast from "../../../hooks/feedback/useToast";
import useAuth from "../../../hooks/persistence/useAuth";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SubmitButton from "../Buttons/SubmitButton";
import ScrollBar from "../Scrollbar/ScrollBar";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import CircularProgress from "@mui/material/CircularProgress";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const NewChatForm = ({
  open,
  handleClose,
  handleChatSelection,
  chats,
  setChats,
}) => {
  const { auth } = useAuth();
  const userType = auth.payload.RoleType;
  const userCompanyName = auth.payload.Company;
  const showToast = useToast();
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const showToastRef = useRef(showToast);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const res = await getAllCompanies();
        const companiesArr = res.data.$values;

        const filteredCompanies = companiesArr.filter((company) => {
          const isSameCompany = company.name === userCompanyName;
          const isSameCompanyType = company.type === userType;
          const isUserClient = userType === "Cliente";
          const isCompanyLaboratory = company.type === "Laboratorio";

          if (
            isSameCompany ||
            isSameCompanyType ||
            (isUserClient && isCompanyLaboratory)
          ) {
            return false;
          }

          return true;
        });

        setCompanies(filteredCompanies);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;
        showToastRef.current(
          "Ocurrió un error al obtener las empresas, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, [userCompanyName, userType]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(companyName.toLowerCase())
  );

  const handleCompanySelection = (company) => {
    setSelectedCompany(company);
  };

  const handleSubmit = async () => {
    try {
      setLoadingSubmit(true);

      await sendMessage({
        idReceiver: selectedCompany.id,
        content: message,
      });

      const res = await getChats();
      const chatsRes = res.data.$values;
      const chat = chatsRes.find(
        (chat) => chat.receiverId === selectedCompany.id
      );

      if (chatsRes.length > chats.length) {
        setChats(chatsRes);
      }

      handleChatSelection(chat);
      setCompanyName("");
      setSelectedCompany(null);
      setMessage("");
      handleClose();
    } catch (error) {
      showToast(
        "Ocurrió un error al enviar nuevo mensaje, informelo al equipo técnico",
        { type: "error" }
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "600px",
        },
      }}
    >
      <DialogTitle>Enviar mensaje</DialogTitle>
      <Divider />
      <ScrollBar>
        <DialogContent>
          {!selectedCompany && (
            <>
              <TextField
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                label="Buscar empresa"
                margin="dense"
                variant="standard"
                fullWidth
              />
              <Paper sx={{ height: 200, overflow: "auto", my: 2 }}>
                {loadingCompanies && (
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
                {!loadingCompanies && (
                  <ScrollBar>
                    <List>
                      {filteredCompanies.length === 0 ? (
                        <Box
                          sx={{
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <DomainDisabledIcon
                            sx={{ mt: 4, fontSize: 100, color: "primary.main" }}
                          />
                        </Box>
                      ) : (
                        filteredCompanies.map((company) => (
                          <ListItem key={company.id} disablePadding>
                            <ListItemButton
                              onClick={() => handleCompanySelection(company)}
                            >
                              <ListItemIcon>
                                <Avatar
                                  src={ASSETS + company.urlImage}
                                  alt={company.name}
                                />
                              </ListItemIcon>
                              <ListItemText primary={company.name} />
                            </ListItemButton>
                          </ListItem>
                        ))
                      )}
                    </List>
                  </ScrollBar>
                )}
              </Paper>
            </>
          )}
          {selectedCompany && (
            <>
              <Button
                startIcon={<KeyboardBackspaceIcon />}
                onClick={() => {
                  setSelectedCompany(null);
                  setMessage("");
                }}
                sx={{ mb: 2 }}
              >
                Volver
              </Button>
              <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                label={`Escribe a ${selectedCompany.name}`}
                margin="dense"
                variant="standard"
                fullWidth
                maxRows={8}
              />
            </>
          )}
        </DialogContent>
      </ScrollBar>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <SubmitButton
          text="Enviar"
          loadingText="Enviando..."
          loading={loadingSubmit}
          onClick={handleSubmit}
          disabled={!(selectedCompany && message.trim())}
        />
      </DialogActions>
    </Dialog>
  );
};

NewChatForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChatSelection: PropTypes.func.isRequired,
  chats: PropTypes.array.isRequired,
  setChats: PropTypes.func.isRequired,
};

export default NewChatForm;
