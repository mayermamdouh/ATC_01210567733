
import { Outlet } from "react-router-dom";
import AppBar from "../components/appbar";
import Footer from "../components/footer";

const UserLayout = () => {
  return (
    <div>
      <AppBar />
        <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
