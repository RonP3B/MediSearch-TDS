import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import BusinessIcon from "@mui/icons-material/Business";

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
    item: "Productos",
    icon: <ShoppingBasketIcon />,
    to: "/company/products",
  },
  {
    item: "Proveedores",
    icon: <BusinessIcon />,
    to: "/company/providers",
  },
];
