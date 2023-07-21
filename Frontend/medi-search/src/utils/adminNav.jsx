import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import MedicationIcon from "@mui/icons-material/Medication";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

export const adminNav = [
  {
    item: "Dashboard",
    icon: <DashboardIcon />,
    to: "/company/dashboard",
  },
  {
    item: "Usuarios",
    icon: <PersonIcon />,
    to: "/company/users",
  },
  {
    item: "Crear Usuario",
    icon: <PersonAddIcon />,
    to: "/company/users/add",
  },
  {
    item: "Productos",
    icon: <ShoppingCartIcon />,
    to: "/company/products",
  },
  {
    item: "Crear Producto",
    icon: <AddShoppingCartIcon />,
    to: "/company/products/add",
  },
  {
    item: "Mi perfil",
    icon: <BadgeIcon />,
    to: "/company/my-profile",
  },
  {
    item: "Proveedores",
    icon: <BusinessIcon />,
    to: "/company/providers",
  },
  {
    item: "Provisiones",
    icon: <MedicationIcon />,
    to: "/company/provisions",
  },
  { item: "Acreedores", icon: <LocalPharmacyIcon />, to: "/company/creditors" },
  {
    item: "Chat",
    icon: <MarkUnreadChatAltIcon />,
    to: "/company/chat",
  },
];
