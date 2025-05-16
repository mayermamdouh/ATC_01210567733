import { Outlet } from "react-router-dom";
import AppBar from "../components/appbar";

const AdminLayout = () => {
  return (
    <div>
        <AppBar/>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
